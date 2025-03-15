
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MembershipData, RevenueData, ClassAttendanceData } from '@/utils/exportUtils';
import {
  generateMockMembershipData,
  generateMockRevenueData,
  generateMockClassAttendanceData,
  LocalMembershipData,
  LocalRevenueData,
  LocalClassAttendanceData
} from '@/utils/dashboardMockData';

export const useDashboardData = (timeFilter: string) => {
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
        // For now, using mock data until we have real data in the database
        const mockMembershipData = generateMockMembershipData();
        const mockRevenueData = generateMockRevenueData();
        const mockClassAttendanceData = generateMockClassAttendanceData();
        
        setMembershipData(mockMembershipData);
        setRevenueData(mockRevenueData);
        setClassAttendanceData(mockClassAttendanceData);
        
        // Transform the data for export utilities
        const transformedMembershipData: MembershipData[] = mockMembershipData.map(item => ({
          name: item.month,
          members: item.total,
          month: item.month,
          active: item.active,
          canceled: item.canceled,
          total: item.total,
          value: item.total,
          capacity: 0
        }));
        
        const transformedRevenueData: RevenueData[] = mockRevenueData.map(item => ({
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
        
        const transformedClassAttendanceData: ClassAttendanceData[] = mockClassAttendanceData.map(item => ({
          name: item.className,
          value: item.attendance,
          className: item.className,
          attendance: item.attendance,
          capacity: item.capacity,
          total: item.capacity
        }));
        
        setExportMembershipData(transformedMembershipData);
        setExportRevenueData(transformedRevenueData);
        setExportClassAttendanceData(transformedClassAttendanceData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeFilter]);

  return {
    membershipData,
    revenueData,
    classAttendanceData,
    exportMembershipData,
    exportRevenueData,
    exportClassAttendanceData,
    isLoading
  };
};
