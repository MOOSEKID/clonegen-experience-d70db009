
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isAdmin, refreshSession } = useAuth();
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Refresh session to ensure we have the latest auth state
        await refreshSession();
        
        if (!isAuthenticated || !isAdmin) {
          console.log('Admin authentication failed, redirecting to login');
          toast.error('You must be logged in as an administrator');
          navigate('/login', { state: { from: '/admin' } });
        } else {
          console.log('Admin authenticated successfully');
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login', { state: { from: '/admin' } });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // No need for frequent polling anymore since we're using onAuthStateChange
    // Just check once every 10 minutes as a fallback
    const interval = setInterval(checkAuth, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, [navigate, isAuthenticated, isAdmin, refreshSession]);

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

  if (!isAuthenticated || !isAdmin) {
    return null; // Redirect will happen in the useEffect
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
