import { create } from 'zustand';

type SidebarStore = {
  isMobileSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isMobileSidebarOpen: false,
  openSidebar: () => set({ isMobileSidebarOpen: true }),
  closeSidebar: () => set({ isMobileSidebarOpen: false }),
  toggleSidebar: () =>
    set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
}));

export default useSidebarStore;
