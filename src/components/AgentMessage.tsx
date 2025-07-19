import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface AgentMessageProps {
  message: string;
  isLoading: boolean;
}

export default function AgentMessage({ message, isLoading }: AgentMessageProps) {
  return (
    <div className="flex justify-start mb-2 px-2" lang='fa' >
      <div className="max-w-[320px] rounded-[16px] border border-[#E2E8F0] bg-white p-3 text-[14px] text-[#1E293B] font-medium">
        {isLoading ? (
          <div className="w-[66px] flex items-center justify-center">
            <MoreHorizIcon style={{ color: '#475569' }} />
          </div>
        ) : (
          <p dir='rtl'>{message}</p>
        )}
      </div>
    </div>
  )
}
