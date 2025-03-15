
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
  trainerName?: string;
  
  // Additional properties needed by the components
  averageRating?: number;
  totalClasses?: number;
  averageAttendance?: number;
  clientRetentionRate?: number;
  monthlySessions?: Array<{ month: string; count: number }>;
  completionRate?: number;
  assignedClients?: number;
  retentionRate?: number;
  satisfactionScore?: number;
  activeClients?: number;
  monthlyGrowth?: number;
}

export interface ClassAttendance {
  class_name: string;
  class_date: string;
  enrolled_count: number;
  attended_count: number;
  attendance_rate: number;
}

export interface TrainerPerformanceSummary {
  trainerId: string;
  trainerName: string;
  metrics: PerformanceMetrics;
  trendData: {
    clientGrowth: number[];
    classRatings: number[];
    retention: number[];
  };
}
