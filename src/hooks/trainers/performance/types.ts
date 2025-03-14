
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

export interface TrainerPerformanceRecord {
  id: string;
  trainer_id: string;
  date: string;
  classes_taught: number;
  private_sessions: number;
  new_clients: number;
  avg_session_rating: number;
  total_hours: number;
  monthly_goal_progress: number;
  class_fill_rate: number;
  created_at: string;
  updated_at: string;
}

export interface AttendanceRecord {
  id: string;
  trainer_id: string;
  member_id?: string;
  check_in: string;
  check_out?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
