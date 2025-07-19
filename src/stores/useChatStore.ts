import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatState {
  activeSessionId: string | null
  activeSessionTitle: string
  setActiveSessionId: (id: string | null) => void
  setActiveSessionTitle: (title: string) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      activeSessionId: null,
      activeSessionTitle: 'Session',
      setActiveSessionId: (id) => set({ activeSessionId: id }),
      setActiveSessionTitle: (title) => set({ activeSessionTitle: title }),
    }),
    {
      name: 'chat-storage',
    }
  )
)
