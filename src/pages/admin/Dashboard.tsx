
import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';
import { supabase } from '@/integrations/supabase/client';
import { MembershipData, RevenueData, ClassAttendanceData } from '@/utils/exportUtils';

// Types that match the ChartsSection component requirements
interface LocalMembershipData {
  month: string;
  active: number;
  canceled: number;
  total: number;
}

interface LocalRevenueData {
  month: string;
  memberships: number;
  classes: number;
  other: number;
  total: number;
}

interface LocalClassAttendanceData {
  className: string;
  attendance: number;
  capacity: number;
}

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [membershipData, setMembershipData] = useState<LocalMembershipData[]>([]);
  const [revenueData, setRevenueData] = useState<LocalRevenueData[]>([]);
  const [classAttendanceData, setClassAttendanceData] = useState<LocalClassAttendanceData[]>([]);
  const [exportMembershipData, setExportMembershipData] = useState<MembershipData[]>([]);
  const [exportRevenueData, setExportRevenueData] = useState<RevenueData[]>([]);
  const [exportClassAttendanceData, setExportClassAttendanceData] = useState<ClassAttendanceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Attempt to fetch data from Supabase
        // If this fails, we'll fall back to mock data
        
        // For now, using mock data until we have real data in the database
        const mockMembershipData = generateMockMembershipData();
        const mockRevenueData = generateMockRevenueData();
        const mockClassAttendanceData = generateMockClassAttendanceData();
        
        // Set the local state for ChartsSection component
        setMembershipData(mockMembershipData);
        setRevenueData(mockRevenueData);
        setClassAttendanceData(mockClassAttendanceData);
        
        // Transform the data to match the expected format for exportUtils
        const transformedMembershipData: MembershipData[] = mockMembershipData.map(item => ({
          name: item.month,
          members: item.total,
          month: item.month,
          active: item.active,
          canceled: item.canceled,
          total: item.total,
          value: item.total, // Required for the chart
          capacity: 0 // Not used for membership data
        }));
        
        const transformedRevenueData: RevenueData[] = mockRevenueData.map(item => ({
          name: item.month,
          revenue: item.total,
          month: item.month,
          memberships: item.memberships,
          classes: item.classes,
          other: item.other,
          total: item.total,
          value: item.total, // Required for the chart
          capacity: 0 // Not used for revenue data
        }));
        
        const transformedClassAttendanceData: ClassAttendanceData[] = mockClassAttendanceData.map(item => ({
          name: item.className,
          value: item.attendance,
          className: item.className,
          attendance: item.attendance,
          capacity: item.capacity,
          total: item.capacity // Using capacity as total for percentage calculations
        }));
        
        setExportMembershipData(transformedMembershipData);
        setExportRevenueData(transformedRevenueData);
        setExportClassAttendanceData(transformedClassAttendanceData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error case
        const mockMembershipData = generateMockMembershipData();
        const mockRevenueData = generateMockRevenueData();
        const mockClassAttendanceData = generateMockClassAttendanceData();
        
        setMembershipData(mockMembershipData);
        setRevenueData(mockRevenueData);
        setClassAttendanceData(mockClassAttendanceData);
        
        // Transform for export
        const fallbackMembershipData: MembershipData[] = mockMembershipData.map(item => ({
          name: item.month,
          members: item.total,
          month: item.month,
          active: item.active,
          canceled: item.canceled,
          total: item.total,
          value: item.total,
          capacity: 0
        }));
        
        const fallbackRevenueData: RevenueData[] = mockRevenueData.map(item => ({
          name: item.month,
          revenue: item.total,
          month: item.month,
          memberships: item.memberships,
          classes: item.classes,
          other: item.other,
          total: item.total,
          value: item.total,
          capacity: 0
        }));
        
        const fallbackClassAttendanceData: ClassAttendanceData[] = mockClassAttendanceData.map(item => ({
          name: item.className,
          value: item.attendance,
          className: item.className,
          attendance: item.attendance,
          capacity: item.capacity,
          total: item.capacity // Using capacity as total for percentage calculations
        }));
        
        setExportMembershipData(fallbackMembershipData);
        setExportRevenueData(fallbackRevenueData);
        setExportClassAttendanceData(fallbackClassAttendanceData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeFilter]);

  // Mock data generation functions
  const generateMockMembershipData = (): LocalMembershipData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      active: Math.floor(Math.random() * 50) + 50, // 50-100
      canceled: Math.floor(Math.random() * 10) + 5, // 5-15
      total: Math.floor(Math.random() * 70) + 60 // 60-130
    }));
  };

  const generateMockRevenueData = (): LocalRevenueData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => {
      const memberships = Math.floor(Math.random() * 500000) + 1000000; // 1M-1.5M
      const classes = Math.floor(Math.random() * 300000) + 500000; // 500K-800K
      const other = Math.floor(Math.random() * 200000) + 100000; // 100K-300K
      return {
        month,
        memberships,
        classes,
        other,
        total: memberships + classes + other
      };
    });
  };

  const generateMockClassAttendanceData = (): LocalClassAttendanceData[] => {
    const classes = ['HIIT', 'Yoga', 'Zumba', 'Spin', 'Pilates', 'Boxing', 'Strength'];
    return classes.map(className => ({
      className,
      attendance: Math.floor(Math.random() * 30) + 10, // 10-40
      capacity: 40
    }));
  };

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
