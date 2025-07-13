import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Link from 'next/link';

export default function Login(){
  return(

    <div className="flex items-center justify-center h-screen">

        <div className="w-[462px] h-[266px] flex flex-col gap-6 m-6">
            <h2 className="mb-2 text-[#1E293B] font-extrabold text-[30px]">Signup</h2>

            <input type="email" placeholder="Email" className="w-full px-4 py-3 h-[50px] border-1 border-[#CBD5E1] text-[#475569] text-[16px] rounded-full shadow-md" />
      
            <input type="password" placeholder="Password" className="w-full px-4 py-3 h-[50px] border-1 border-[#CBD5E1] text-[#475569] text-[16px] rounded-full shadow-md" />

            <div className="flex flex-row justify-between items-center">
              <Link href={"/login"}>
                <p className='font-semibold text-[20px] text-[#4F46E5]'>have an account?</p>
              </Link>
                

                <div className="flex flex-row rounded-full w-[111px] h-[48px] bg-[#4F46E5] items-center justify-center gap-[10px]">
                        <p className='text-[16px] font-bold text-white'>
                            Send
                        </p>
                        <SendRoundedIcon style={{color: "white"}}/>
                </div>
            </div>


        </div>

    </div>




  )
}