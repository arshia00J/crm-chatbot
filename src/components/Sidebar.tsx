'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useChatStore } from '@/stores/useChatStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { deleteSession } from '@/app/(chat)/server'
import { getTitle } from '@/app/(chat)/server';

import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { fetchSessions } from '@/app/(chat)/server'
import UserMenu from '@/components/UserMenu'

interface SidebarProps {
  onChatClick?: () => void;
}

type ChatSession = {
  session_id: string
  title: string
}

export default function Sidebar({ onChatClick }: SidebarProps) {

  const [sessions, setSessions] = useState<ChatSession[]>([])
  const activeSessionId = useChatStore((state) => state.activeSessionId)
  const setActiveSessionId = useChatStore((state) => state.setActiveSessionId)
  const setActiveSessionTitle = useChatStore((state) => state.setActiveSessionTitle)
  const token = useAuthStore((state) => state.access_token)

  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

useEffect(() => {
  const loadSessions = async () => {
    if (!token) return;
    try {
      const sessionsData = await fetchSessions(token);

      const mapped = await Promise.all(
        sessionsData.map(async (session: ChatSession) => {
          const title = await getTitle(token, session.session_id);
          return {
            session_id: session.session_id,
            title,
          };
        })
      );

      setSessions(mapped);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  loadSessions();
}, [token]);




  const handleDelete = async (sessionIdToDelete: string) => {
  if (!token) return
  try {
    await deleteSession(token, sessionIdToDelete)
    setSessions(prev => prev.filter(s => s.session_id !== sessionIdToDelete))

    if (activeSessionId === sessionIdToDelete) {
      setActiveSessionId(null)
      router.push('/')
    }
  } catch (err) {
    console.error('Failed to delete session:', err)
    alert((err as Error).message)
  }
}




  const createSession = () => {
    const newSession: ChatSession = {
      session_id: crypto.randomUUID(),
      title: `New Chat`,
    }
    const updated = [...sessions, newSession]
    setSessions(updated)
    setActiveSessionId(newSession.session_id)
    setActiveSessionTitle('New Chat')
    router.push(`/chat/${newSession.session_id}`)
  }

const handleSelect = (session: ChatSession) => {
  setActiveSessionId(session.session_id)
  setActiveSessionTitle(session.title)
  if (onChatClick) onChatClick()
  router.push(`/chat/${session.session_id}`)
}


  return (
    <aside className="lg:w-[360px] w-full bg-white h-screen overflow-y-auto">
      <div className="flex px-6 py-2.5 justify-between items-center border-b-1 border-[#E2E8F0]">
        <h2 className="text-lg font-semibold text-[#1E293B]">CRM chatbot</h2>
        <div className='flex items-center gap-5'>
          <button onClick={createSession} className="cursor-pointer text-[#1E293B]">
            <AddBoxRoundedIcon/>
          </button>
          <div className='lg:hidden'> 
           <UserMenu/>
          </div>
        </div>

      </div>

      <div className="flex flex-col py-4">
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <h3 className="font-bold text-[18px] text-[#1E293B]">Chats</h3>

          <KeyboardArrowDownRoundedIcon
            className={`cursor-pointer ${isOpen ? "" : "rotate-180"}`}
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: '#475569', width: '30px', height: '30px' }}
          />
        </div>

        {isOpen &&
          sessions.map((session) => (
            <div
              key={session.session_id}
              onClick={() => handleSelect(session)}
              className={`cursor-pointer flex justify-between items-center px-6 py-4 h-[54px] text-[16px] font-medium text-[#1E293B]
                ${activeSessionId === session.session_id
                  ? 'bg-[#EEF2FF] border-l-4 pl-5 border-[#4F46E5]'
                  : 'hover:bg-gray-100'}
              `}
              lang='fa'
            >
                <p className='truncate' dir='rtl' >{session.title}</p>


              <span className={`text-[14px] font-medium text-[#94A3B8] ${activeSessionId === session.session_id ? "hidden" : ""}`}>2m ago</span>
              <div className={`${activeSessionId === session.session_id ? "flex flex-row justify-between w-[88px]" : "hidden"}`}>
                <ModeEditOutlineOutlinedIcon className='text-[#94A3B8]' />
                <DeleteOutlineRoundedIcon
                  className='text-[#F43F5E] cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(session.session_id)
                  }}
                />
                <MoreHorizRoundedIcon className='text-[#94A3B8]' />
              </div>

            </div>
          ))}
      </div>
    </aside>
  )
}
