
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';

export interface PerformanceStatsGridProps {
  trainerId: string;
}

const PerformanceStatsGrid: React.FC<PerformanceStatsGridProps> = ({ trainerId }) => {
  const { metrics, statistics, isLoading } = useTrainerPerformance(trainerId);
  
  if (isLoading) {
    return <div>Loading performance statistics...</div>;
  }
  
  if (!metrics || !statistics) {
    return <div>No performance data available</div>;
  }
  
  const stats = [
    { label: 'Classes Taught', value: statistics.classesTaught },
    { label: 'Private Sessions', value: statistics.privateSessions },
    { label: 'New Clients', value: statistics.newClients },
    { label: 'Active Clients', value: statistics.activeClients },
    { label: 'Avg. Session Rating', value: `${statistics.avgSessionRating}/5` },
    { label: 'Monthly Goal Progress', value: `${statistics.monthlyGoalProgress}%` },
    { label: 'Class Fill Rate', value: `${statistics.classFillRate}%` },
    { label: 'Total Hours', value: statistics.totalHours },
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
