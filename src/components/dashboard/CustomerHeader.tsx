
import { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerHeaderProps {
  toggleSidebar: () => void;
}

const CustomerHeader = ({ toggleSidebar }: CustomerHeaderProps) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userEmail = localStorage.getItem('userEmail') || '';
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <header className="bg-gym-darkblue py-3 px-6 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-64 rounded-full bg-gym-dark/50 border border-gray-700 pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gym-orange focus:border-gym-orange"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative text-white/80 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-gym-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 text-white hover:text-gym-orange transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gym-orange/20 text-gym-orange flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="hidden md:block font-medium">{userName}</span>
            <ChevronDown size={16} className={cn("transition-transform", userMenuOpen && "rotate-180")} />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-gym-darkblue border border-gray-700 rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 border-b border-gray-700">
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-gray-400">{userEmail}</p>
              </div>
              <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gym-dark hover:text-white transition-colors">
                Your Profile
              </a>
              <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gym-dark hover:text-white transition-colors">
                Settings
              </a>
              <a 
                href="/login" 
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gym-dark hover:text-white transition-colors"
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('userEmail');
                }}
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
