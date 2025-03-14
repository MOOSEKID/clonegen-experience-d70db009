
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TrainerPerformanceMetrics {
  id: string;
  trainer_id: string;
  month: string;
  classes_conducted: number;
  attendance_rate: number;
  client_retention_rate: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

export interface ClassAttendance {
  class_name: string;
  class_date: string;
  enrolled_count: number;
  attended_count: number;
  attendance_rate: number;
}

export const useTrainerPerformance = (trainerId?: string) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<TrainerPerformanceMetrics[]>([]);
  const [classAttendance, setClassAttendance] = useState<ClassAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!trainerId) return;
      
      setIsLoading(true);
      try {
        // Fetch performance metrics
        const { data: metricsData, error: metricsError } = await supabase
          .from('trainer_performance_metrics')
          .select('*')
          .eq('trainer_id', trainerId)
          .order('month', { ascending: false });
        
        if (metricsError) throw metricsError;
        setPerformanceMetrics(metricsData || []);
        
        // Fetch class attendance data
        // This is a simplified query - in a real app you would calculate attendance from enrollment records
        const { data: classesData, error: classesError } = await supabase
          .from('classes')
          .select(`
            id,
            name,
            day,
            time,
            capacity,
            class_enrollments(*)
          `)
          .eq('trainer_id', trainerId)
          .limit(10);
        
        if (classesError) throw classesError;
        
        // Transform class data into attendance metrics
        const attendanceData = (classesData || []).map(classItem => {
          const enrolledCount = classItem.class_enrollments?.length || 0;
          const attendedCount = Math.floor(Math.random() * (enrolledCount + 1)); // Mock data for demo
          const attendanceRate = enrolledCount > 0 ? (attendedCount / enrolledCount) * 100 : 0;
          
          return {
            class_name: classItem.name,
            class_date: `${classItem.day} ${classItem.time}`,
            enrolled_count: enrolledCount,
            attended_count: attendedCount,
            attendance_rate: attendanceRate
          };
        });
        
        setClassAttendance(attendanceData);
      } catch (err) {
        console.error('Error fetching performance data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch performance data'));
        toast.error('Failed to load performance data');
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
