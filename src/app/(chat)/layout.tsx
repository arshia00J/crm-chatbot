'use client'

import MobileMenu from '@/components/MobileMenu';
import Sidebar from '@/components/Sidebar';
import useSidebarStore from '@/stores/useSidebarStore';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const isMobileSidebarOpen = useSidebarStore((state) => state.isMobileSidebarOpen);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden">
            <Sidebar onChatClick={closeSidebar} />

          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
