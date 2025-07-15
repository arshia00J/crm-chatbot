interface ClientMessageProps {
  message: string
}

export default function ClientMessage({ message }: ClientMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[320px] rounded-[16px] bg-[#4F46E5] p-3 text-[14px] text-white font-medium">
        <p>{message}</p>
      </div>
    </div>

  )
}
