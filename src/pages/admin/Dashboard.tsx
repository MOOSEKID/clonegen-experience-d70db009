
import React from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import RecentActivities from '@/components/admin/dashboard/RecentActivities';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';
import CreateAdminButton from '@/components/admin/setup/CreateAdminButton';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      
      {/* Admin Account Setup */}
      <div className="flex justify-end mb-4">
        <CreateAdminButton />
      </div>
      
      <StatsSection />
      <ChartsSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivities />
        <AdditionalInsights />
      </div>
    </div>
  );
};

export default AdminDashboard;
