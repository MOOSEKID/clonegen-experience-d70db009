
export interface PerformanceMetrics {
  id: string;
  trainerId: string;
  period: string; // 'weekly', 'monthly', 'yearly'
  classes_taught: number;
  private_sessions: number;
  new_clients: number;
  client_retention_rate: number;
  avg_session_rating: number;
  monthly_goal_progress: number;
  class_fill_rate: number;
  total_hours: number;
  
  // Legacy fields for compatibility
  averageRating: number;
  totalClasses: number;
  averageAttendance: number;
  clientRetentionRate: number;
  monthlySessions: { date: string; sessions: number }[];
  completionRate: number;
  assignedClients: number;
  retentionRate: number;
  satisfactionScore: number;
  activeClients: number;
  monthlyGrowth: number;
}

export interface ClassAttendance {
  id: string;
  class_id: string;
  class_name: string;
  date: string;
  time: string;
  duration: number;
  trainer_id: string;
  expected_attendance: number;
  actual_attendance: number;
  attendance_rate: number;
}
