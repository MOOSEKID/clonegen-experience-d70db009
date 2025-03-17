
import React from 'react';
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
  
  // Safely access performance metrics properties with fallbacks
  const stats = [
    { label: 'Classes Taught', value: performanceMetrics.totalClasses || 0 },
    { label: 'Private Sessions', value: performanceMetrics.monthlySessions?.[0]?.count || 0 },
    { label: 'New Clients', value: performanceMetrics.clientRetentionRate ? Math.floor(performanceMetrics.clientRetentionRate / 10) : 0 },
    { label: 'Active Clients', value: performanceMetrics.activeClients || 0 },
    { label: 'Avg. Session Rating', value: `${performanceMetrics.averageRating || 0}/5` },
    { label: 'Monthly Goal Progress', value: `${performanceMetrics.completionRate || 0}%` },
    { label: 'Class Fill Rate', value: `${performanceMetrics.averageAttendance || 0}%` },
    { label: 'Total Hours', value: performanceMetrics.totalClasses * 1.5 || 0 },
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
