
import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Menu, Users, Dumbbell, Calendar, BarChart2, Settings, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-gray-800 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Uptown Gym</h1>
          ) : (
            <span className="text-xl font-bold">UG</span>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/dashboard"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/members"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <Users className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Members</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/trainers"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <Dumbbell className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Trainers</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/classes"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <Calendar className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Classes</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/reports"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Reports</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/settings"
                className="flex items-center p-2 rounded-lg hover:bg-gray-700"
              >
                <Settings className="h-5 w-5 mr-3" />
                {sidebarOpen && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {sidebarOpen && (
          <div className="mt-auto">
            <Separator className="my-4" />
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar_url || undefined} />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.full_name || user?.email}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="text-sm">
                    <p className="font-medium">New member signup</p>
                    <p className="text-gray-500">John Doe joined 5 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="text-sm">
                    <p className="font-medium">Class booking</p>
                    <p className="text-gray-500">New booking for Yoga class</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar_url || undefined} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
