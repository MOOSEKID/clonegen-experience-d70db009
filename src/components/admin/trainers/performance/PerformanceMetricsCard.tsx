
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';

export interface PerformanceMetricsCardProps {
  trainerId: string;
  trainerName: string;
  fullView?: boolean;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({ 
  trainerId, 
  trainerName,
  fullView = false 
}) => {
  const { metrics, isLoading } = useTrainerPerformance(trainerId);
  
  if (isLoading) {
    return <div>Loading performance metrics...</div>;
  }
  
  if (!metrics) {
    return <div>No metrics available</div>;
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{fullView ? 'Performance Metrics' : `${trainerName}'s Performance`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            <p className="text-2xl font-bold">{metrics.clientSatisfaction}/5</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Class Attendance</p>
            <p className="text-2xl font-bold">{metrics.classAttendance}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Client Retention</p>
            <p className="text-2xl font-bold">{metrics.clientRetention}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue Generated</p>
            <p className="text-2xl font-bold">${metrics.revenueGenerated}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
