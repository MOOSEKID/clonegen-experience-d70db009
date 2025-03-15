
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get admin authentication status from localStorage and cookies
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const sessionActive = document.cookie.includes('session_active=true');
        const isAdminRole = document.cookie.includes('user_role=admin');
        
        if ((!isAdmin || !sessionActive) && !isAdminRole) {
          toast.error('You must be logged in as an administrator');
          navigate('/login');
        } else {
          // Ensure both storage mechanisms are synchronized
          if (!isAdmin && isAdminRole) {
            localStorage.setItem('isAdmin', 'true');
          }
          
          setIsAuthenticated(true);
          // Refresh session cookie to maintain login state
          document.cookie = "session_active=true; path=/; max-age=2592000"; // 30 days
          document.cookie = "user_role=admin; path=/; max-age=2592000"; // 30 days
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
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader toggleSidebar={toggleSidebar} />
        
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
