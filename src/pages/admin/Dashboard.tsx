
import { useState } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');

  return (
    <div className="space-y-6">
      <DashboardHeader timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      <StatsSection />
      <ChartsSection />
      <AdditionalInsights />
    </div>
  );
};

export default AdminDashboard;
