import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Bell, User, Home, ClipboardList, AlertTriangle } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
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
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-200'}`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>
        <Link to="/tasks" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/tasks') ? 'text-orange-500' : 'text-gray-400 hover:text-gray-200'}`}>
          <ClipboardList className="w-6 h-6" />
          <span className="text-[10px] font-medium">Tasks</span>
        </Link>
        <Link to="/fault-codes" className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/fault-codes') ? 'text-orange-500' : 'text-gray-400 hover:text-gray-200'}`}>
          <AlertTriangle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Faults</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-200">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
