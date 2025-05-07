
import { useState } from 'react';
import { Bell, Menu, Search, X, User, LogOut, Settings, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AdminThemeToggle from './AdminThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader = ({ toggleSidebar }: AdminHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  // Get user data from auth context or fallback to localStorage
  const userEmail = user?.email || localStorage.getItem('userEmail') || 'admin@example.com';
  const userName = user?.user_metadata?.full_name || localStorage.getItem('userName') || 'Admin User';
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'New member registered', time: '2 minutes ago', read: false },
    { id: 2, message: 'Payment received from Sarah Johnson', time: '1 hour ago', read: false },
    { id: 3, message: 'New class booking: Yoga at 5 PM', time: '3 hours ago', read: true },
    { id: 4, message: 'Monthly report is ready', time: '1 day ago', read: true },
  ];

  const handleLogout = async () => {
    try {
      console.log("Admin logging out using auth context");
      const success = await logout();
      
      if (success) {
        toast.success('Logged out successfully');
        navigate('/login');
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 flex h-16 items-center">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-4"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gym-orange focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <AdminThemeToggle />
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="font-medium">Notifications</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowNotifications(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    <div>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        >
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{notification.message}</p>
                            {!notification.read && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                  <Button variant="ghost" size="sm" className="w-full text-center text-sm">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 flex items-center gap-2 px-2">
                <div className="h-8 w-8 rounded-full bg-gym-orange/20 flex items-center justify-center text-gym-orange font-medium">
                  A
                </div>
                <span className="text-sm font-medium hidden md:inline-block">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <p className="font-semibold">{userName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/admin/users')}>
                <UserCog className="mr-2 h-4 w-4" />
                <span>User Management</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
