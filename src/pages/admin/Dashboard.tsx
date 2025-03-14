
import { useState } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection, { membershipData, revenueData } from '@/components/admin/dashboard/ChartsSection';
import AdditionalInsights, { classAttendanceData } from '@/components/admin/dashboard/AdditionalInsights';

interface DashboardHeaderProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  membershipData: any;
  revenueData: any;
  classAttendanceData: any;
}

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');

  return (
    <div className="space-y-6">
      <DashboardHeader 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter} 
        membershipData={membershipData}
        revenueData={revenueData}
        classAttendanceData={classAttendanceData}
      />
      <StatsSection />
      <ChartsSection />
      <AdditionalInsights />
    </div>
  );
};

export default AdminDashboard;
