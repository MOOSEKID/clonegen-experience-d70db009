
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        console.log('AdminLayout - checking auth', { isAuthenticated, isAdmin });
        
        if (!isAuthenticated) {
          console.log('Not authenticated, redirecting to login');
          toast.error('You must be logged in to access the admin area');
          navigate('/login', { replace: true });
          return;
        }
        
        if (!isAdmin) {
          console.log('Not an admin, redirecting to dashboard');
          toast.error('You do not have permission to access the admin area');
          navigate('/dashboard', { replace: true });
          return;
        }

        console.log('Admin authenticated successfully');
      } catch (error) {
        console.error('Authentication check error:', error);
        toast.error('Authentication error. Please log in again.');
        navigate('/login', { replace: true });
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
