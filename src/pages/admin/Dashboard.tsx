
import { useState } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';
import { useDashboardData } from '@/hooks/admin/useDashboardData';

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const {
    membershipData,
    revenueData,
    classAttendanceData,
    exportMembershipData,
    exportRevenueData,
    exportClassAttendanceData,
    isLoading
  } = useDashboardData(timeFilter);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter} 
        membershipData={exportMembershipData}
        revenueData={exportRevenueData}
        classAttendanceData={exportClassAttendanceData}
      />
      <StatsSection />
      <ChartsSection 
        membershipData={membershipData}
        revenueData={revenueData}
      />
      <AdditionalInsights classAttendanceData={exportClassAttendanceData} />
    </div>
  );
};

export default AdminDashboard;
