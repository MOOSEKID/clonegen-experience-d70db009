
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import CustomerHeader from '@/components/dashboard/CustomerHeader';
import { MenuIcon, BellIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/toaster';

interface CustomerHeaderProps {
  toggleSidebar: () => void;
}

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Uptown Gym</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  {/* Fix: Correctly access avatar_url from user_metadata which might be undefined */}
                  <AvatarImage src={user?.user_metadata?.avatar_url || undefined} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CustomerHeader toggleSidebar={toggleSidebar} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block h-full`}>
          <CustomerSidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
