'use client'

import { useValidateToken } from '@/hooks/useValidateToken'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '@/stores/useAuthStore'

export default function ChatSessionPage() {
  const { token, isValidating } = useValidateToken()
  const email = useAuthStore((state) => state.email)

  if (isValidating) {
    return <div className="p-4">Validating token...</div>
  }

  return (
    <div>
      {/* Header of Chat */}
      <div className='h-[96px] w-full flex p-6 justify-between border-b-1 border-[#E2E8F0]'>
        <h2 className='text-[#1E293B] text-[30px] font-extrabold'>Welcome to CRM chatbot</h2>
        <div className='flex flex-row justify-between items-center gap-4'>
          <div className='flex gap-3 items-center'>
            <AccountCircleIcon />
            <p className='text-[#1E293B] font-bold text-[16px]'>
              {email ?? 'Guest'}
            </p>
          </div>
          <KeyboardArrowDownRoundedIcon />
        </div>
      </div>
    </div>
  )
}
