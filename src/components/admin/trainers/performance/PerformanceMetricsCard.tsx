
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';

export interface PerformanceMetricsCardProps {
  trainerId: string;
  metricName?: string;
  metricValue?: string | number;
  description?: string;
  trainerName?: string;
  fullView?: boolean;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({ 
  trainerId, 
  metricName, 
  metricValue, 
  description,
  trainerName,
  fullView = false
}) => {
  const { performanceMetrics, isLoading } = useTrainerPerformance(trainerId);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{metricName || 'Performance Metrics'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Loading...</div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
      </Card>
    );
  }
  
  if (fullView && performanceMetrics) {
    // Render a full performance metrics view
    return (
      <Card>
        <CardHeader>
          <CardTitle>{trainerName ? `${trainerName}'s Performance` : 'Performance Metrics'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Sessions Taught</p>
              <p className="text-xl">{performanceMetrics.sessions.total}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Sessions Completed</p>
              <p className="text-xl">{performanceMetrics.sessions.completed}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Attendance Rate</p>
              <p className="text-xl">{Math.round((performanceMetrics.attendance.onTime / performanceMetrics.attendance.total) * 100)}%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Rating</p>
              <p className="text-xl">{performanceMetrics.ratings.average}/5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{metricName || 'Performance Metric'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metricValue !== undefined ? metricValue : 'N/A'}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
