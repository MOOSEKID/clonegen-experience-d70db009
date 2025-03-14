
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  CalendarDays,
  TrendingUp,
  Star,
  Clock,
  Heart,
} from 'lucide-react';

export interface PerformanceMetricsCardProps {
  trainerId: string;
  trainerName: string;
  fullView?: boolean;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({
  trainerId,
  trainerName,
  fullView = false,
}) => {
  const { performanceMetrics: metrics, isLoading } = useTrainerPerformance(trainerId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  const metricsList = [
    {
      icon: <Users className="h-4 w-4 mr-2 text-blue-500" />,
      name: 'Active Clients',
      value: metrics.assignedClients,
    },
    {
      icon: <CalendarDays className="h-4 w-4 mr-2 text-green-500" />,
      name: 'Sessions This Month',
      value: metrics.monthlySessions,
    },
    {
      icon: <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />,
      name: 'Client Retention',
      value: `${metrics.retentionRate}%`,
    },
    {
      icon: <Clock className="h-4 w-4 mr-2 text-orange-500" />,
      name: 'Attendance Rate',
      value: `${metrics.completionRate}%`,
    },
    {
      icon: <Star className="h-4 w-4 mr-2 text-yellow-500" />,
      name: 'Average Rating',
      value: metrics.averageRating.toFixed(1),
    },
  ];

  // Only show these metrics in full view
  const extendedMetrics = [
    {
      icon: <Heart className="h-4 w-4 mr-2 text-red-500" />,
      name: 'Client Satisfaction',
      value: `${metrics.satisfactionScore}%`,
    },
  ];

  const displayMetrics = fullView
    ? [...metricsList, ...extendedMetrics]
    : metricsList;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {trainerName}'s Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {displayMetrics.map((metric, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                {metric.icon}
                <span className="text-gray-600">{metric.name}</span>
              </div>
              <span className="font-medium">{metric.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
