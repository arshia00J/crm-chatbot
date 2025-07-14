'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {
  params: { id: string }
}

export default function ChatPage({ params }: Props) {
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    if (id === 'new') {
      const newId = crypto.randomUUID()
      const newSession = {
        id: newId,
        title: `Chat ${new Date().toLocaleTimeString()}`,
      }

      const stored = localStorage.getItem('chat_sessions')
      const sessions = stored ? JSON.parse(stored) : []
      const updated = [...sessions, newSession]
      localStorage.setItem('chat_sessions', JSON.stringify(updated))

      router.replace(`/chat/${newId}`)
    }
  }, [id, router])

  if (id === 'new') {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Creating new chat...
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Chat ID: {id}
      </h1>
      <p className="text-gray-600">This is your chat screen. Start chatting here!</p>
    </div>
  )
}
