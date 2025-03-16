
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import CustomerHeader from '@/components/dashboard/CustomerHeader';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        console.log('Dashboard: Checking auth state:', { isAuthenticated, isAdmin });
        
        if (!isAuthenticated) {
          console.log('User not authenticated, redirecting to login');
          toast.error('You must be logged in to access this page');
          navigate('/login', { state: { from: '/dashboard' } });
          return;
        }
        
        // If user is admin, redirect to admin dashboard
        if (isAdmin) {
          console.log('Admin user detected, redirecting to admin dashboard');
          navigate('/admin', { replace: true });
          return;
        }
        
        console.log('User authenticated and is not admin, staying on dashboard');
      } catch (error) {
        console.error('Authentication check error:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login', { state: { from: '/dashboard' } });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, isAuthenticated, isAdmin]);

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
