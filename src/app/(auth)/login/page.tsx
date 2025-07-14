'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/(auth)/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setToken = useAuthStore((state) => state.setToken)

  const handleLogin = async () => {
    try {
      const data = await login({ username: email, password })
      setToken(data.access_token) 
      router.push('/')
    } catch (err) {
      alert((err as Error).message || 'Login failed')
    }
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[462px] h-[266px] flex flex-col gap-6 m-6">
        <h2 className="mb-2 text-[#1E293B] font-extrabold text-[30px]">Login</h2>

        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 h-[50px] border-1 border-[#CBD5E1] text-[#475569] text-[16px] rounded-full shadow-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 h-[50px] border-1 border-[#CBD5E1] text-[#475569] text-[16px] rounded-full shadow-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-row justify-between items-center">
          <Link href="/signup">
            <p className="font-semibold text-[20px] text-[#4F46E5]">create account</p>
          </Link>

          <button
            onClick={handleLogin}
            className="cursor-pointer flex flex-row rounded-full w-[111px] h-[48px] bg-[#4F46E5] items-center justify-center gap-[10px]"
          >
            <p className="text-[16px] font-bold text-white">Send</p>
            <SendRoundedIcon style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
