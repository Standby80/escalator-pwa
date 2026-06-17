import { Outlet } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-dark-card border-b border-dark-border px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <button className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex gap-4 items-center">
          <button className="text-gray-400 hover:text-white relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-semibold text-sm border border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
            KT
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full w-full">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-dark-card border-t border-dark-border fixed bottom-0 w-full max-w-lg left-1/2 -translate-x-1/2 flex justify-around px-2 py-3 pb-safe z-50">
        <button className="flex flex-col items-center gap-1 text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
          <span className="text-[10px] font-medium">Tasks</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-200">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
