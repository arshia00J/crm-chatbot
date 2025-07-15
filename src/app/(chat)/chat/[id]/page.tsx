'use client'

import { useParams } from 'next/navigation'
import { useValidateToken } from '@/hooks/useValidateToken'
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore'


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function ChatPage() {
  const params = useParams()
  const session_id = params?.id as string

  const { isValidating } = useValidateToken()
  const email = useAuthStore((state) => state.email)

  if (isValidating) {
    return <div className="p-6 text-gray-500">Validating token...</div>
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header of Chat */}
      <div className='h-[96px] w-full flex p-6 justify-between border-b border-[#E2E8F0]'>
        <h2 className='text-[#1E293B] text-[30px] font-extrabold'>Session title</h2>
        <div className='flex flex-row items-center gap-4'>
          <div className='flex gap-3 items-center'>
            <AccountCircleIcon />
            <p className='text-[#1E293B] font-bold text-[16px]'>
              {email ?? 'Guest'}
            </p>
          </div>
          <KeyboardArrowDownRoundedIcon />
        </div>
      </div>

      {/* Main chat content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="text-gray-500">Chat messages go here...</div>
      </div>

      {/* Chat Input */}
      <div className="px-8 py-6 ">
        <div className="flex flex-col w-full justify-between rounded-[24px] shadow-sm border border-[#E2E8F0] p-4 bg-white">
          <input
            type="text"
            placeholder="Message to slothpilot..."
            className="flex-1 outline-none text-gray-700 text-sm bg-transparent mb-3"
          />
          <div className="flex justify-end gap-3">
            <button className="text-gray-400 hover:text-gray-600">
              <AttachFileRoundedIcon />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <MicNoneRoundedIcon />
            </button>
            <button className="ml-2 px-4 py-2 bg-[#4F46E5] text-white text-sm rounded-full flex items-center gap-1">
              <span>Send</span>
              <SendRoundedIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
