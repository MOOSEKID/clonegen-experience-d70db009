
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface PerformanceMetricsCardProps {
  trainerId: string;
  metricName: string;
  metricValue: string | number;
  description?: string;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({ 
  metricName, 
  metricValue, 
  description 
}) => {
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
