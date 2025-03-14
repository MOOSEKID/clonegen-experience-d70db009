
export interface PerformanceMetrics {
  averageRating: number;
  totalClasses: number;
  averageAttendance: number;
  clientRetentionRate: number;
  monthlySessions: { month: string; count: number }[];
  completionRate: number;
  // Fields for PerformanceMetricsCard
  assignedClients?: number;
  retentionRate?: number;
  satisfactionScore?: number;
  // Fields for PerformanceStatsGrid
  activeClients?: number;
  monthlyGrowth?: number;
  // Legacy field names (for backwards compatibility)
  classes_taught?: number;
  private_sessions?: number;
  new_clients?: number;
  avg_session_rating?: number;
  monthly_goal_progress?: number;
  class_fill_rate?: number;
  total_hours?: number;
}

export interface ClassAttendance {
  class_name: string;
  class_date: string;
  enrolled_count: number;
  attended_count: number;
  attendance_rate: number;
}
