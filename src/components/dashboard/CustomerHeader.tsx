
import { useState } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, CreditCard, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerHeaderProps {
  toggleSidebar: () => void;
}

const CustomerHeader = ({ toggleSidebar }: CustomerHeaderProps) => {
  const navigate = useNavigate();
  
  // Try to get auth context, or use fallback values if not available
  let userName = 'User';
  let userEmail = '';
  let logoutFunction = async () => {
    toast.error('Authentication system not ready');
    return false;
  };
  
  try {
    const { user, logout } = useAuth();
    userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
    userEmail = user?.email || '';
    logoutFunction = logout;
  } catch (error) {
    console.error("Auth context not available yet:", error);
  }

  const handleLogout = async () => {
    try {
      const success = await logoutFunction();
      if (success) {
        toast.success('Logged out successfully');
        navigate('/login');
      } else {
        toast.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('An error occurred during logout');
    }
  };

  return (
    <ErrorBoundary>
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-white hover:text-gym-orange transition-colors">
                <div className="h-8 w-8 rounded-full bg-gym-orange/20 text-gym-orange flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:block font-medium">{userName}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <p className="font-semibold">{userName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/memberships')}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>My Membership</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/schedule')}>
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>My Schedule</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </ErrorBoundary>
  );
};

export default CustomerHeader;
