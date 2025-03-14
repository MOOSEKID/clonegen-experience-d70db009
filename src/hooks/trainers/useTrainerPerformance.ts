
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PerformanceMetrics {
  averageRating: number;
  totalClasses: number;
  averageAttendance: number;
  clientRetentionRate: number;
  monthlySessions: { month: string; count: number }[];
  completionRate: number;
}

export interface ClassAttendance {
  class_name: string;
  class_date: string;
  enrolled_count: number;
  attended_count: number;
  attendance_rate: number;
}

export const useTrainerPerformance = (trainerId?: string) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    averageRating: 0,
    totalClasses: 0,
    averageAttendance: 0,
    clientRetentionRate: 0,
    monthlySessions: [],
    completionRate: 0
  });
  
  const [classAttendance, setClassAttendance] = useState<ClassAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!trainerId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // In a real app, we would fetch this data from Supabase
        // Here we'll create mock data
        
        // Mock performance metrics
        const mockMetrics: PerformanceMetrics = {
          averageRating: 4.3,
          totalClasses: 156,
          averageAttendance: 85,
          clientRetentionRate: 78,
          monthlySessions: [
            { month: 'Jan', count: 18 },
            { month: 'Feb', count: 20 },
            { month: 'Mar', count: 22 },
            { month: 'Apr', count: 19 },
            { month: 'May', count: 24 },
            { month: 'Jun', count: 28 }
          ],
          completionRate: 95
        };
        
        // Mock attendance records
        const mockAttendance: ClassAttendance[] = [
          {
            class_name: 'Morning HIIT',
            class_date: 'Mon, June 10',
            enrolled_count: 12,
            attended_count: 10,
            attendance_rate: 83
          },
          {
            class_name: 'Power Yoga',
            class_date: 'Wed, June 12',
            enrolled_count: 15,
            attended_count: 14,
            attendance_rate: 93
          },
          {
            class_name: 'Kickboxing',
            class_date: 'Fri, June 14',
            enrolled_count: 10,
            attended_count: 7,
            attendance_rate: 70
          },
          {
            class_name: 'Core Strength',
            class_date: 'Mon, June 17',
            enrolled_count: 8,
            attended_count: 8,
            attendance_rate: 100
          },
          {
            class_name: 'Spin Class',
            class_date: 'Wed, June 19',
            enrolled_count: 18,
            attended_count: 12,
            attendance_rate: 67
          }
        ];
        
        setPerformanceMetrics(mockMetrics);
        setClassAttendance(mockAttendance);
      } catch (err) {
        console.error('Error fetching trainer performance:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainer performance data'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPerformanceData();
  }, [trainerId]);
  
  return {
    performanceMetrics,
    classAttendance,
    isLoading,
    error
  };
};
