
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';

export interface PerformanceStatsGridProps {
  trainerId: string;
}

const PerformanceStatsGrid: React.FC<PerformanceStatsGridProps> = ({ trainerId }) => {
  const { performanceMetrics, isLoading } = useTrainerPerformance(trainerId);
  
  if (isLoading) {
    return <div>Loading performance statistics...</div>;
  }
  
  if (!performanceMetrics) {
    return <div>No performance data available</div>;
  }
  
  // Create stats from performance metrics
  const stats = [
    { label: 'Sessions Total', value: performanceMetrics.sessions.total },
    { label: 'Sessions Completed', value: performanceMetrics.sessions.completed },
    { label: 'Sessions Canceled', value: performanceMetrics.sessions.canceled },
    { label: 'No Shows', value: performanceMetrics.sessions.noShow },
    { label: 'Average Rating', value: `${performanceMetrics.ratings.average}/5` },
    { label: 'Attendance On-Time', value: `${Math.round((performanceMetrics.attendance.onTime / performanceMetrics.attendance.total) * 100)}%` },
    { label: 'Attendance Late', value: performanceMetrics.attendance.late },
    { label: 'Attendance Missed', value: performanceMetrics.attendance.missed },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className="text-2xl font-bold mt-1">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceStatsGrid;
