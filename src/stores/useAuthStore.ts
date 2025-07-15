import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  access_token: string | null
  email: string | null
  setToken: (token: string) => void
  setEmail: (email: string) => void
  clearAuth: () => void
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access_token: null,
      email: null,
      setToken: (token) => set({ access_token: token }),
      setEmail: (email) => set({ email }),
      clearAuth: () => set({ access_token: null, email: null }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true)
        }
      },
    }
  )
)
