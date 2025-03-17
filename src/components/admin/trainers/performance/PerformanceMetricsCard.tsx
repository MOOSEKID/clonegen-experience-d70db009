
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';

export interface PerformanceMetricsCardProps {
  trainerId: string;
  metricName: string;
  metricValue: string | number;
  description?: string;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({ 
  trainerId, 
  metricName, 
  metricValue, 
  description 
}) => {
  const { performanceMetrics, isLoading } = useTrainerPerformance(trainerId);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{metricName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Loading...</div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{metricName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metricValue}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
