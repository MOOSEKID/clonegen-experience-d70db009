import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsSection from '@/components/admin/dashboard/StatsSection';
import ChartsSection from '@/components/admin/dashboard/ChartsSection';
import AdditionalInsights from '@/components/admin/dashboard/AdditionalInsights';
import { supabase } from '@/integrations/supabase/client';

// Types for our dashboard data
export interface MembershipData {
  month: string;
  active: number;
  canceled: number;
  total: number;
  name?: string;
  members?: number;
}

export interface RevenueData {
  month: string;
  memberships: number;
  classes: number;
  other: number;
  total: number;
  name?: string;
  revenue?: number;
}

export interface ClassAttendanceData {
  className: string;
  attendance: number;
  capacity: number;
  name?: string;
  value?: number;
}

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  const [membershipData, setMembershipData] = useState<MembershipData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [classAttendanceData, setClassAttendanceData] = useState<ClassAttendanceData[]>([]);
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
        
        // Add required properties for exportUtils
        const enhancedMembershipData = mockMembershipData.map(item => ({
          ...item,
          name: item.month,
          members: item.total
        }));
        
        const enhancedRevenueData = mockRevenueData.map(item => ({
          ...item,
          name: item.month,
          revenue: item.total
        }));
        
        const enhancedClassAttendanceData = mockClassAttendanceData.map(item => ({
          ...item,
          name: item.className,
          value: item.attendance
        }));
        
        setMembershipData(enhancedMembershipData);
        setRevenueData(enhancedRevenueData);
        setClassAttendanceData(enhancedClassAttendanceData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fall back to mock data if fetching fails
        setMembershipData(generateMockMembershipData());
        setRevenueData(generateMockRevenueData());
        setClassAttendanceData(generateMockClassAttendanceData());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeFilter]);

  // Mock data generation functions
  const generateMockMembershipData = (): MembershipData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      active: Math.floor(Math.random() * 50) + 50, // 50-100
      canceled: Math.floor(Math.random() * 10) + 5, // 5-15
      total: Math.floor(Math.random() * 70) + 60 // 60-130
    }));
  };

  const generateMockRevenueData = (): RevenueData[] => {
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

  const generateMockClassAttendanceData = (): ClassAttendanceData[] => {
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
        membershipData={membershipData}
        revenueData={revenueData}
        classAttendanceData={classAttendanceData}
      />
      <StatsSection />
      <ChartsSection 
        membershipData={membershipData}
        revenueData={revenueData}
      />
      <AdditionalInsights />
    </div>
  );
};

export default AdminDashboard;
