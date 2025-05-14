
import { PerformanceMetrics, ClassAttendance } from './types';

export const generateMockPerformanceMetrics = (staffId?: string): PerformanceMetrics => {
  return {
    id: staffId || 'mock-id',
    staffId: staffId || 'mock-staff-id',
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
      { date: 'Jan', sessions: 18 },
      { date: 'Feb', sessions: 20 },
      { date: 'Mar', sessions: 22 },
      { date: 'Apr', sessions: 19 },
      { date: 'May', sessions: 24 },
      { date: 'Jun', sessions: 28 }
    ],
    completionRate: 95,
    assignedClients: 12,
    retentionRate: 78,
    satisfactionScore: 89,
    activeClients: 15,
    monthlyGrowth: 8
  };
};

export const generateMockAttendanceData = (staffId?: string): any[] => {
  return [
    {
      id: '1',
      class_id: 'class-1',
      class_name: 'Morning HIIT',
      date: 'Mon, June 10',
      time: '08:00',
      durationMinutes: 45,
      staff_id: staffId || 'staff-1',
      expected_attendance: 12,
      actual_attendance: 10,
      attendance_rate: 83
    },
    {
      id: '2',
      class_id: 'class-2',
      class_name: 'Power Yoga',
      date: 'Wed, June 12',
      time: '10:00',
      durationMinutes: 60,
      staff_id: staffId || 'staff-1',
      expected_attendance: 15,
      actual_attendance: 14,
      attendance_rate: 93
    },
    {
      id: '3',
      class_id: 'class-3',
      class_name: 'Kickboxing',
      date: 'Fri, June 14',
      time: '17:00',
      durationMinutes: 50,
      staff_id: staffId || 'staff-1',
      expected_attendance: 10,
      actual_attendance: 7,
      attendance_rate: 70
    },
    {
      id: '4',
      class_id: 'class-4',
      class_name: 'Core Strength',
      date: 'Mon, June 17',
      time: '19:00',
      durationMinutes: 45,
      staff_id: staffId || 'staff-1',
      expected_attendance: 8,
      actual_attendance: 8,
      attendance_rate: 100
    },
    {
      id: '5',
      class_id: 'class-5',
      class_name: 'Spin Class',
      date: 'Wed, June 19',
      time: '18:00',
      durationMinutes: 45,
      staff_id: staffId || 'staff-1',
      expected_attendance: 18,
      actual_attendance: 12,
      attendance_rate: 67
    }
  ];
};
