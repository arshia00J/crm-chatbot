'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchSessions } from '@/app/(chat)/server'
import { useAuthStore } from '@/stores/useAuthStore'

export function useValidateToken() {
  const token = useAuthStore((state) => state.access_token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const router = useRouter()
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    if (!hasHydrated) return

    const validate = async () => {
      if (!token) {
        alert('No token found. Please login.')
        router.push('/login')
        return
      }

      try {
        await fetchSessions(token)
        setIsValidating(false)
      } catch (err: any) {
        alert(err.message || 'Invalid token')
        router.push('/login')
      }
    }

    validate()
  }, [token, hasHydrated, router])

  return { token, isValidating }
}
