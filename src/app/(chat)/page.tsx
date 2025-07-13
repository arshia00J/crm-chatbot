// app/chat/page.tsx (یا هر فایل دیگر)
'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function ChatPage() {
    type ChatSession = {
    id: string
    title: string
    }

    const [activeSession, setActiveSession] = useState<ChatSession | null>(null)

  return (
    <div className="flex">
      <Sidebar onSelectSession={(s) => setActiveSession(s)} />

      <main className="flex-1 p-4">
        {activeSession ? (
          <div>
            <h2 className="text-xl font-bold mb-2">{activeSession.title}</h2>
          </div>
        ) : (
          <p className="text-gray-500">Select or create a chat session to begin</p>
        )}
      </main>
    </div>
  )
}
