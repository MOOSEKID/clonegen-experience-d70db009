
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import CustomerHeader from '@/components/dashboard/CustomerHeader';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    console.log('DashboardLayout mounted, checking auth state:', { isAuthenticated });
    
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        if (!isAuthenticated) {
          console.log('User not authenticated, redirecting to login from dashboard');
          toast.error('You must be logged in to access this page');
          navigate('/login', { state: { from: '/dashboard' } });
        } else {
          console.log('User is authenticated in dashboard:', user?.email);
        }
      } catch (error) {
        console.error('Authentication check error in dashboard:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login', { state: { from: '/dashboard' } });
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
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
