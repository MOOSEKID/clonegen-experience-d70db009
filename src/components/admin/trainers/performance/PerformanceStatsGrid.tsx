
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Calendar, Award, Clock } from 'lucide-react';

export interface PerformanceStatsGridProps {
  trainerId: string;
}

const PerformanceStatsGrid = ({ trainerId }: PerformanceStatsGridProps) => {
  const { performanceMetrics: metrics, isLoading } = useTrainerPerformance(trainerId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Active Clients',
      value: metrics.assignedClients,
      change: '+5% from last month',
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Sessions This Month',
      value: metrics.monthlySessions,
      change: `${metrics.sessionGrowth}% from last month`,
      icon: <Calendar className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Rating',
      value: metrics.averageRating.toFixed(1),
      change: 'Based on 24 reviews',
      icon: <Award className="h-5 w-5 text-amber-500" />,
    },
    {
      title: 'Attendance Rate',
      value: `${metrics.completionRate}%`,
      change: 'Over the last 30 days',
      icon: <Clock className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            {stat.icon}
          </div>
          <p className="text-2xl font-bold my-1">{stat.value}</p>
          <p className="text-xs text-gray-500">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStatsGrid;
