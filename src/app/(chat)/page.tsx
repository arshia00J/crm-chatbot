'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { fetchSessions } from '@/app/(chat)/server'
import { useAuthStore } from '@/stores/useAuthStore' // adjust path as needed

export default function ChatSessionPage() {
  // const router = useRouter()
   const token = useAuthStore((state) => state.access_token)

  // useEffect(() => {
  //   const validateToken = async () => {
  //     if (!token) {
  //       alert('No token found. Please login.')
  //       router.push('/login')
  //       return
  //     }

  //     try {
  //       await fetchSessions(token)
  //       // valid token, do nothing
  //     } catch (err: any) {
  //       alert(err.message || 'Invalid token')
  //       router.push('/login')
  //     }
  //   }

  //   validateToken()
  // }, [token, router]) 

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-semibold">Click on + to new chat {token}</h1>
      </main>
    </div>
  )
}
