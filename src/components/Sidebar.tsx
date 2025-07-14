'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

type ChatSession = {
  id: string
  title: string
}

export default function Sidebar({
  onSelectSession,
}: {
  onSelectSession: (session: ChatSession) => void
}) {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

  const createSession = () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: `Chat ${sessions.length + 1}`,
    }
    setSessions([...sessions, newSession])
    setActiveSessionId(newSession.id)
    onSelectSession(newSession)
    router.push(`/chat/${newSession.id}`)
  }

  const handleSelect = (session: ChatSession) => {
    setActiveSessionId(session.id)
    onSelectSession(session)
    router.push(`/chat/${session.id}`)
  }

  return (
    <aside className="w-[360px] bg-white h-screen overflow-y-auto">
      <div className="flex px-6 py-2.5 justify-between items-center border-b-1 border-[#E2E8F0]">
        <h2 className="text-lg font-semibold">CRM chatbot</h2>
        <button onClick={createSession} className="text-4xl cursor-pointer">
          +
        </button>
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
              key={session.id}
              onClick={() => handleSelect(session)}
              className={`cursor-pointer flex justify-between items-center px-6 py-4 h-[54px] text-[16px] font-medium text-[#1E293B]
                ${activeSessionId === session.id
                  ? 'bg-[#EEF2FF] border-l-4 pl-5 border-[#4F46E5]'
                  : 'hover:bg-gray-100'}
              `}
            >
              <p>{session.title}</p>

              <span className={`text-[14px] font-medium text-[#94A3B8] ${activeSessionId === session.id ? "hidden" : ""}`}>2m ago</span>
              <div  className={`${activeSessionId === session.id ? "flex flex-row justify-between w-[88px]" : "hidden"}`}>
                <ModeEditOutlineOutlinedIcon className='text-[#94A3B8]'/>
                <DeleteOutlineRoundedIcon className='text-[#F43F5E]'/>
                <MoreHorizRoundedIcon className='text-[#94A3B8]'/>

              </div>
            </div>
          ))}

      </div>
    </aside>
  )
}
