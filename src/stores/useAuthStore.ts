import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  access_token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access_token: null,
      setToken: (token) => set({ access_token: token }),
      clearToken: () => set({ access_token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
