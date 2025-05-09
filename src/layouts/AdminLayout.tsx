
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isAdmin, user } = useAuth();
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    console.log('AdminLayout mounted, checking auth state:', { isAuthenticated, isAdmin, user });
    
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Fast check using cached data first
        const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
        const isAdminLocal = localStorage.getItem('isAdmin') === 'true';
        
        if (!isLoggedInLocal) {
          console.log('User not authenticated, redirecting to login from admin layout');
          toast.error('You must be logged in to access this page', {
            id: 'admin-auth-redirect',
          });
          navigate('/login', { state: { from: '/admin' }, replace: true });
          return;
        }
        
        if (!isAdminLocal) {
          console.log('User authenticated but not an admin, redirecting to dashboard');
          toast.error('You must be an administrator to access this page', {
            id: 'admin-role-redirect',
          });
          navigate('/dashboard', { replace: true });
          return;
        }
        
        // All checks passed
        console.log('Admin authenticated successfully');
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication check error:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login', { state: { from: '/admin' }, replace: true });
      }
    };

    // Run the auth check
    checkAuth();
    
  }, [navigate, isAuthenticated, isAdmin, user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const switchToDashboard = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner color="gym-orange" size="lg" text="Loading admin dashboard..." />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null; // Redirect will happen in the useEffect
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Placeholder for AdminSidebar */}
      <div className={`w-64 bg-white shadow-sm ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4">Admin Sidebar</div>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Placeholder for AdminHeader */}
        <header className="bg-white shadow-sm h-16 flex items-center px-4">
          <button onClick={toggleSidebar} className="mr-4">Toggle</button>
          <h1>Admin Dashboard</h1>
        </header>
        
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Admin Mode</span>
              <AlertCircle size={16} className="text-gym-orange" />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <span>Switch View</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium" disabled>
                  Admin Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={switchToDashboard}>
                  Member Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
