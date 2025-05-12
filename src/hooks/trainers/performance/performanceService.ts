
import { PerformanceMetrics, ClassAttendance } from './types';

// Simulated data service for trainer performance metrics
export const fetchTrainerPerformance = async (trainerId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data for performance metrics
  const performanceMetrics: PerformanceMetrics = {
    id: `perf-${trainerId}`,
    trainerId,
    period: 'monthly',
    classes_taught: 45,
    private_sessions: 32,
    new_clients: 8,
    client_retention_rate: 87,
    avg_session_rating: 4.7,
    monthly_goal_progress: 92,
    class_fill_rate: 86,
    total_hours: 120,
    
    // Legacy field support
    averageRating: 4.7,
    totalClasses: 45,
    averageAttendance: 8.5,
    clientRetentionRate: 87,
    monthlySessions: generateMonthlySessions(),
    completionRate: 95,
    assignedClients: 24,
    retentionRate: 87,
    satisfactionScore: 94,
    activeClients: 22,
    monthlyGrowth: 4
  };
  
  // Mock data for class attendance
  const classAttendance: ClassAttendance[] = Array(8).fill(0).map((_, i) => ({
    id: `att-${i}`,
    class_id: `class-${i}`,
    class_name: ['HIIT Workout', 'Yoga Flow', 'Strength Training', 'Spin Class'][i % 4],
    date: new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0],
    time: ['08:00', '12:30', '17:00', '19:30'][i % 4],
    duration: [45, 60, 90][i % 3],
    trainer_id: trainerId,
    expected_attendance: 12,
    actual_attendance: Math.floor(Math.random() * 5) + 7, // 7-12 attendees
    attendance_rate: Math.floor(Math.random() * 30) + 70 // 70-100%
  }));
  
  return { performanceMetrics, classAttendance };
};

// Helper to generate mock monthly session data
function generateMonthlySessions() {
  const result = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    result.push({
      date: dateStr,
      sessions: Math.floor(Math.random() * 5) + 1 // 1-5 sessions
    });
  }
  
  return result;
}
