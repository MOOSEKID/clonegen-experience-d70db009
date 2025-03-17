
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check admin authentication
  useEffect(() => {
    // Mock implementation checking auth
    console.log("Checking admin authentication");
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
