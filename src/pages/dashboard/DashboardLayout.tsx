
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import CustomerHeader from '@/components/dashboard/CustomerHeader';
import { toast } from 'sonner';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check user authentication
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get user authentication status from localStorage and cookies
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const sessionActive = document.cookie.includes('session_active=true');
        
        if (!isLoggedIn && !sessionActive) {
          toast.error('You must be logged in to access this page');
          navigate('/login');
        } else {
          // Ensure both storage mechanisms are synchronized
          if (!isLoggedIn && sessionActive) {
            localStorage.setItem('isLoggedIn', 'true');
          }
          
          setIsAuthenticated(true);
          // Refresh session cookie to maintain login state
          document.cookie = "session_active=true; path=/; max-age=2592000"; // 30 days
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

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
    return null; // The navigate in useEffect will handle redirection
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
