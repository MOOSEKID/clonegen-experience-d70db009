
import React, { useState } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import RecentActivities from '@/components/admin/dashboard/RecentActivities';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';
import CreateAdminButton from '@/components/admin/setup/CreateAdminButton';
import { useQuery } from '@tanstack/react-query';

// Define the proper interfaces for chart data
interface MembershipData {
  name: string;
  members: number;
  month?: string;
  newMembers?: number;
  cancelledMembers?: number;
}

interface RevenueData {
  name: string;
  value: number;
  month?: string;
  revenue?: number;
}

interface ClassAttendanceData {
  name: string;
  value: number;
  class?: string;
  attendees?: number;
}

// Mock data for dashboard
const mockMembershipData: MembershipData[] = [
  { name: 'Jan', members: 45, month: 'Jan', newMembers: 45, cancelledMembers: 12 },
  { name: 'Feb', members: 55, month: 'Feb', newMembers: 55, cancelledMembers: 15 },
  { name: 'Mar', members: 75, month: 'Mar', newMembers: 75, cancelledMembers: 10 },
  { name: 'Apr', members: 85, month: 'Apr', newMembers: 85, cancelledMembers: 20 },
  { name: 'May', members: 65, month: 'May', newMembers: 65, cancelledMembers: 15 },
  { name: 'Jun', members: 80, month: 'Jun', newMembers: 80, cancelledMembers: 17 },
];

const mockRevenueData: RevenueData[] = [
  { name: 'Jan', value: 12500, month: 'Jan', revenue: 12500 },
  { name: 'Feb', value: 15000, month: 'Feb', revenue: 15000 },
  { name: 'Mar', value: 18500, month: 'Mar', revenue: 18500 },
  { name: 'Apr', value: 22000, month: 'Apr', revenue: 22000 },
  { name: 'May', value: 19500, month: 'May', revenue: 19500 },
  { name: 'Jun', value: 23500, month: 'Jun', revenue: 23500 },
];

const mockClassAttendanceData: ClassAttendanceData[] = [
  { name: 'Yoga', value: 120, class: 'Yoga', attendees: 120 },
  { name: 'Spinning', value: 85, class: 'Spinning', attendees: 85 },
  { name: 'HIIT', value: 95, class: 'HIIT', attendees: 95 },
  { name: 'Pilates', value: 75, class: 'Pilates', attendees: 75 },
  { name: 'Zumba', value: 110, class: 'Zumba', attendees: 110 },
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
