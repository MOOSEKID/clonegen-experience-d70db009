
import { supabase } from '@/integrations/supabase/client';
import { PerformanceMetrics, ClassAttendance } from './types';
import { generateMockPerformanceMetrics, generateMockAttendanceData } from './mockData';

export const fetchTrainerPerformance = async (trainerId?: string) => {
  if (!trainerId) {
    return {
      performanceMetrics: {} as PerformanceMetrics,
      classAttendance: [] as ClassAttendance[]
    };
  }
  
  try {
    // In a real app, we would fetch this data from Supabase
    // Here we're using mock data
    
    // Mock performance metrics
    const mockMetrics = generateMockPerformanceMetrics(trainerId);
    
    // Mock attendance records
    const mockAttendance = generateMockAttendanceData(trainerId);
    
    return {
      performanceMetrics: mockMetrics,
      classAttendance: mockAttendance
    };
  } catch (err) {
    console.error('Error fetching trainer performance:', err);
    throw err instanceof Error ? err : new Error('Failed to fetch trainer performance data');
  }
};
