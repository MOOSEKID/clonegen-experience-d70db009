
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
