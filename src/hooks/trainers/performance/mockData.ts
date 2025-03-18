
import { PerformanceMetrics, ClassAttendance } from './types';

export const generateMockPerformanceMetrics = (trainerId?: string): PerformanceMetrics => {
  return {
    id: trainerId || 'mock-id',
    trainerId: trainerId || 'mock-trainer-id',
    period: 'monthly',
    classes_taught: 156,
    private_sessions: 45,
    new_clients: 12,
    client_retention_rate: 78,
    avg_session_rating: 4.3,
    monthly_goal_progress: 85,
    class_fill_rate: 85,
    total_hours: 210,
    
    // Additional properties for backward compatibility
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
    completionRate: 95,
    assignedClients: 12,
    retentionRate: 78,
    satisfactionScore: 89,
    activeClients: 15,
    monthlyGrowth: 8
  };
};

export const generateMockAttendanceData = (trainerId?: string): ClassAttendance[] => {
  return [
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
};
