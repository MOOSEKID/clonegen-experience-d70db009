
export interface PerformanceMetrics {
  id: string;
  trainerId: string;
  period: string;
  classes_taught: number;
  private_sessions: number;
  new_clients: number;
  client_retention_rate: number;
  avg_session_rating: number;
  monthly_goal_progress: number;
  class_fill_rate: number;
  total_hours: number;
  
  // Legacy fields
  averageRating: number;
  totalClasses: number;
  averageAttendance: number;
  clientRetentionRate: number;
  monthlySessions: MonthlySession[];
  completionRate: number;
  assignedClients: number;
  retentionRate: number;
  satisfactionScore: number;
  activeClients: number;
  monthlyGrowth: number;
}

export interface MonthlySession {
  month: string;
  sessions: number;
}

export interface ClassAttendance {
  classId: string;
  className: string;
  date: string;
  capacity: number;
  attendees: number;
  fillRate: number;
}
