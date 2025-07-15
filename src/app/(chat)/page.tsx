'use client'

import { useValidateToken } from '@/hooks/useValidateToken'
import UserMenu from '@/components/UserMenu';

export default function ChatSessionPage() {
  const { token, isValidating } = useValidateToken()

  if (isValidating) {
    return <div className="p-4">Validating token...</div>
  }

  return (
    <div>
      {/* Header of Chat */}
      <div className="h-[96px] w-full flex p-6 justify-between items-center border-b border-[#E2E8F0]">
        <h2 className="text-[#1E293B] text-[30px] font-extrabold">Welcome...</h2>
        <UserMenu />
      </div>
      
    </div>
  )
}
