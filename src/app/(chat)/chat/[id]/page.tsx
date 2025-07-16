'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useValidateToken } from '@/hooks/useValidateToken'
import { useAuthStore } from '@/stores/useAuthStore'
import { askAgent, loadChatHistory } from '@/app/(chat)/server'

import UserMenu from '@/components/UserMenu'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import ClientMessage from '@/components/ClientMessage'
import AgentMessage from '@/components/AgentMessage'

export default function ChatPage() {
  const params = useParams()
  const session_id = params?.id as string
  const token = useAuthStore((state) => state.access_token)
  const { isValidating } = useValidateToken()

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<
    { sender: 'user' | 'agent'; text: string; isLoading?: boolean }[]
  >([])
  const [sessionTitle, setSessionTitle] = useState<string>('Session')

  // Load existing chat history
  useEffect(() => {
    const fetchChat = async () => {
      if (!token || !session_id) return

      try {
        const chat = await loadChatHistory(token, session_id)
        const history = chat.chat_history.map(([userText, agentText]) => [
          { sender: 'user' as const, text: userText },
          { sender: 'agent' as const, text: agentText },
        ]).flat()

        setMessages(history)
        setSessionTitle(chat.session_id)
      } catch (err) {
        console.error('Failed to load chat history:', err)
      }
    }

    fetchChat()
  }, [token, session_id])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user' as const, text: input }
    const loadingAgent = { sender: 'agent' as const, text: '', isLoading: true }

    setMessages((prev) => [...prev, userMessage, loadingAgent])
    setInput('')

    try {
      const response = await askAgent({
        query: input,
        session_id,
        token: token || '',
      })

      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          sender: 'agent',
          text: response.response,
          isLoading: false,
        }
        return updated
      })
    } catch (err) {
      alert((err as Error).message)
      setMessages((prev) => prev.slice(0, -1))
    }
  }

  if (isValidating) {
    return <div className="p-6 text-gray-500">Validating token...</div>
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="h-[96px] w-full flex p-6 justify-between items-center border-b border-[#E2E8F0]">
        <h2 className="text-[#1E293B] text-[30px] font-extrabold">{sessionTitle}</h2>
        <div className='hidden lg:flex'>
          <UserMenu/>
        </div>
        
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto md:px-[96px] px-[40px] py-6 gap-3 flex flex-col">
        {messages.map((msg, idx) =>
          msg.sender === 'user' ? (
            <ClientMessage key={idx} message={msg.text} />
          ) : (
            <AgentMessage key={idx} message={msg.text} isLoading={msg.isLoading ?? false} />
          )
        )}
      </div>

      {/* Chat Input */}
      <div className="px-8 py-6">
        <div className="flex flex-col w-full justify-between rounded-[24px] shadow-sm border border-[#E2E8F0] p-4 bg-white">
          <input
            type="text"
            placeholder="Message to chatbot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
            className="flex-1 outline-none text-gray-700 text-sm bg-transparent mb-3"
          />
          <div className="flex justify-end gap-3">
            <button className="text-gray-400 hover:text-gray-600" disabled>
              <AttachFileRoundedIcon />
            </button>
            <button className="text-gray-400 hover:text-gray-600" disabled>
              <MicNoneRoundedIcon />
            </button>
            <button
              onClick={handleSend}
              className="ml-2 px-4 py-2 bg-[#4F46E5] text-white text-sm rounded-full flex items-center gap-2"
            >
              <span>Send</span>
              <SendRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
