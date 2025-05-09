
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Placeholder for CustomerHeader */}
      <header className="bg-white shadow-md h-16 flex items-center px-6">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-md hover:bg-gray-200"
        >
          ≡
        </button>
        <h1 className="text-xl font-semibold">Member Dashboard</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Placeholder for CustomerSidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-sm`}>
          <div className="p-4">
            <nav className="space-y-2">
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Dashboard</div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Workouts</div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Progress</div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">Settings</div>
            </nav>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
