'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useSidebarStore from '@/stores/useSidebarStore';

export default function MobileMenu() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className="lg:hidden flex flex-row p-4 bg-white w-full h-[64px] justify-between border-b border-[#E2E8F0] items-center">
      <h1 className="text-[#1E293B] text-xl font-semibold">CRM Chatbot</h1>
      <div onClick={toggleSidebar} className="cursor-pointer">
        <MenuRoundedIcon className="text-[#1E293B]" />
      </div>
    </div>
  );
}
