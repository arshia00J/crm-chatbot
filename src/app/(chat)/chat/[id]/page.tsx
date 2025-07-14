// /app/chat/[id]/page.tsx
'use client'

import Sidebar from '@/components/Sidebar'

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatSessionPage({ params }: ChatPageProps) {
  const sessionId = params.id

  return (
    <div className="flex">
      <Sidebar onSelectSession={() => {}} />

      <main className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-2">Chat Session: {sessionId}</h2>
        <p>This is where chat messages for session <strong>{sessionId}</strong> would be displayed.</p>
      </main>
    </div>
  )
}
