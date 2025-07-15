'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/app/(auth)/auth';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSignup = async () => {
  try {
    const res = await signup({ username: email, password });
    alert(res.message);
    router.push('/login');
  } catch (err: any) {
    alert(err.message || 'Signup failed');
  }
};


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[462px] h-[266px] flex flex-col gap-6 m-6">
        <h2 className="mb-2 text-[#1E293B] font-extrabold text-[30px]">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 h-[50px] border-1 border-[#CBD5E1] text-[#475569] text-[16px] rounded-full shadow-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 h-[50px] border-1 border-[#CBD5E1] text-[#475569] text-[16px] rounded-full shadow-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-row justify-between items-center">
          <Link href="/login">
            <p className="font-semibold text-[20px] text-[#4F46E5]">have an account?</p>
          </Link>

          <button
            onClick={handleSignup}
            className="flex cursor-pointer flex-row rounded-full w-[111px] h-[48px] bg-[#4F46E5] items-center justify-center gap-[10px]"
          >
            <p className="text-[16px] font-bold text-white">Send</p>
            <SendRoundedIcon style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
