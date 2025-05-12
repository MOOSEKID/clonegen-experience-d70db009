
import { useState, useEffect } from 'react';
import { PerformanceMetrics, ClassAttendance } from './performance/types';
import { fetchStaffPerformance } from './performance/performanceService';

export type { PerformanceMetrics, ClassAttendance };

export const useStaffPerformance = (staffId?: string) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    id: '',
    staffId: '',
    period: '',
    classes_taught: 0,
    private_sessions: 0,
    new_clients: 0,
    client_retention_rate: 0,
    avg_session_rating: 0,
    monthly_goal_progress: 0,
    class_fill_rate: 0,
    total_hours: 0,
    
    // Legacy field support
    averageRating: 0,
    totalClasses: 0,
    averageAttendance: 0,
    clientRetentionRate: 0,
    monthlySessions: [],
    completionRate: 0,
    assignedClients: 0,
    retentionRate: 0,
    satisfactionScore: 0,
    activeClients: 0,
    monthlyGrowth: 0
  });
  
  const [classAttendance, setClassAttendance] = useState<ClassAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchPerformanceData = async () => {
      if (!staffId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        const { performanceMetrics: metrics, classAttendance: attendance } = 
          await fetchStaffPerformance(staffId);
        
        setPerformanceMetrics(metrics);
        setClassAttendance(attendance);
      } catch (err) {
        console.error('Error fetching staff performance:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch staff performance data'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPerformanceData();
  }, [staffId]);
  
  return {
    performanceMetrics,
    classAttendance,
    isLoading,
    error
  };
};

// For backward compatibility
export const useTrainerPerformance = useStaffPerformance;
