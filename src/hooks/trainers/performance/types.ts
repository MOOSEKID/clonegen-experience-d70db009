
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
}

export interface ClassAttendance {
  class_name: string;
  class_date: string;
  enrolled_count: number;
  attended_count: number;
  attendance_rate: number;
}
