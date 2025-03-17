
import { PerformanceMetrics, ClassAttendance } from './types';

export const generateMockPerformanceData = (trainerId: string) => {
  // Create performance metrics
  const performanceMetrics: PerformanceMetrics = {
    id: trainerId,
    trainerId,
    period: 'Current Month',
    classes_taught: 24,
    private_sessions: 45,
    new_clients: 5,
    client_retention_rate: 88,
    avg_session_rating: 4.7,
    monthly_goal_progress: 82,
    class_fill_rate: 89,
    total_hours: 65,
    
    // Legacy fields
    averageRating: 4.7,
    totalClasses: 24,
    averageAttendance: 16,
    clientRetentionRate: 88,
    monthlySessions: [
      { month: 'Jan', sessions: 30 },
      { month: 'Feb', sessions: 35 },
      { month: 'Mar', sessions: 40 },
      { month: 'Apr', sessions: 38 },
      { month: 'May', sessions: 42 },
      { month: 'Jun', sessions: 45 }
    ],
    completionRate: 95,
    assignedClients: 20,
    retentionRate: 88,
    satisfactionScore: 94,
    activeClients: 20,
    monthlyGrowth: 8
  };
  
  // Create mock class attendance data
  const classTypes = ['Yoga', 'HIIT', 'Spinning', 'Zumba', 'Pilates', 'Boxing'];
  const classAttendance: ClassAttendance[] = [];
  
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    const capacity = 20 + Math.floor(Math.random() * 10);
    const attendees = Math.floor(capacity * (0.65 + Math.random() * 0.35));
    
    classAttendance.push({
      classId: `class-${i}`,
      className: classTypes[i % classTypes.length],
      date: dateString,
      capacity,
      attendees,
      fillRate: Math.round((attendees / capacity) * 100)
    });
  }
  
  return {
    performanceMetrics,
    classAttendance
  };
};
