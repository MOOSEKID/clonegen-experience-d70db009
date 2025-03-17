
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
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
  }, [navigate, isAuthenticated, isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Admin sidebar would go here */}
      
      <div className="flex-1 flex flex-col">
        {/* Admin header would go here */}
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="container mx-auto">
            <Routes>
              <Route index element={<div>Admin Dashboard</div>} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
