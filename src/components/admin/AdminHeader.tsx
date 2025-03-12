
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Search,
  Menu,
  MessageSquare,
  Mail,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader = ({ toggleSidebar }: AdminHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`${!isDarkMode ? 'Dark' : 'Light'} mode enabled`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    toast.success('Logged out successfully');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white border-b border-gray-200 py-2 px-4 md:px-6 flex items-center justify-between h-16">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>
        
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-gym-orange focus:ring-1 focus:ring-gym-orange"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" className="relative" size="sm">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button variant="ghost" size="sm">
          <MessageSquare size={20} />
        </Button>
        
        <Button variant="ghost" size="sm">
          <Mail size={20} />
        </Button>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="h-8 w-8 rounded-full bg-gym-orange/20 flex items-center justify-center">
                <User size={16} className="text-gym-orange" />
              </div>
              <span className="hidden md:inline-block">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="hidden md:flex">
          <Link to="/">Visit Website</Link>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
