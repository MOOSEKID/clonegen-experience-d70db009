
import React, { useState } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import RecentActivities from '@/components/admin/dashboard/RecentActivities';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';
import CreateAdminButton from '@/components/admin/setup/CreateAdminButton';
import { useQuery } from '@tanstack/react-query';

// Mock data for dashboard
const mockMembershipData = [
  { month: 'Jan', newMembers: 45, cancelledMembers: 12 },
  { month: 'Feb', newMembers: 55, cancelledMembers: 15 },
  { month: 'Mar', newMembers: 75, cancelledMembers: 10 },
  { month: 'Apr', newMembers: 85, cancelledMembers: 20 },
  { month: 'May', newMembers: 65, cancelledMembers: 15 },
  { month: 'Jun', newMembers: 80, cancelledMembers: 17 },
];

const mockRevenueData = [
  { month: 'Jan', revenue: 12500 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18500 },
  { month: 'Apr', revenue: 22000 },
  { month: 'May', revenue: 19500 },
  { month: 'Jun', revenue: 23500 },
];

const mockClassAttendanceData = [
  { class: 'Yoga', attendees: 120 },
  { class: 'Spinning', attendees: 85 },
  { class: 'HIIT', attendees: 95 },
  { class: 'Pilates', attendees: 75 },
  { class: 'Zumba', attendees: 110 },
];

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('monthly');
  
  // Simulate data loading with React Query
  const { data: membershipData = mockMembershipData } = useQuery({
    queryKey: ['membershipData', timeFilter],
    queryFn: () => Promise.resolve(mockMembershipData),
  });
  
  const { data: revenueData = mockRevenueData } = useQuery({
    queryKey: ['revenueData', timeFilter],
    queryFn: () => Promise.resolve(mockRevenueData),
  });
  
  const { data: classAttendanceData = mockClassAttendanceData } = useQuery({
    queryKey: ['classAttendanceData', timeFilter],
    queryFn: () => Promise.resolve(mockClassAttendanceData),
  });

  return (
    <div className="space-y-8">
      <DashboardHeader 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter}
        membershipData={membershipData}
        revenueData={revenueData}
        classAttendanceData={classAttendanceData}
      />
      
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
