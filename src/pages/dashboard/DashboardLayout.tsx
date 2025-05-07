
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import CustomerHeader from '@/components/dashboard/CustomerHeader';
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

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    console.log('DashboardLayout mounted, checking auth state:', { isAuthenticated, isAdmin });
    
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        if (!isAuthenticated) {
          console.log('User not authenticated, redirecting to login from dashboard');
          toast.error('You must be logged in to access this page');
          navigate('/login', { state: { from: '/dashboard' } });
        } else {
          console.log('User is authenticated in dashboard:', user?.email);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Authentication check error in dashboard:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login', { state: { from: '/dashboard' } });
      } 
    };

    checkAuth();
    
    // Check authentication status periodically
    const interval = setInterval(() => {
      console.log('Running periodic auth check in dashboard');
      if (!isAuthenticated) {
        console.log('User not authenticated in periodic check, redirecting to login');
        clearInterval(interval);
        navigate('/login', { state: { from: '/dashboard' } });
      }
    }, 300000); // 5 minutes
    
    return () => clearInterval(interval);
  }, [navigate, isAuthenticated, user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const switchToAdmin = () => {
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner color="gym-orange" size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen in the useEffect
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gym-dark">
      <CustomerSidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <CustomerHeader toggleSidebar={toggleSidebar} />
        
        {isAdmin && (
          <div className="bg-gym-darkblue/80 border-b border-gray-700 py-2 px-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="font-semibold">Member View</span>
                <AlertCircle size={16} className="text-gym-orange" />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent border-white/20 text-white hover:bg-white/10">
                    <span>Switch View</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={switchToAdmin}>
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium" disabled>
                    Member Dashboard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
