
import { Star, Users, BarChart2, Award } from 'lucide-react';
import { PerformanceMetrics } from '@/hooks/trainers/useTrainerPerformance';
import { Skeleton } from '@/components/ui/skeleton';

interface PerformanceStatsGridProps {
  data: PerformanceMetrics;
  isLoading: boolean;
}

const PerformanceStatsGrid = ({ data, isLoading }: PerformanceStatsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Average Rating",
      value: data.averageRating.toFixed(1),
      suffix: "/5",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      description: "Based on client reviews"
    },
    {
      title: "Total Classes",
      value: data.totalClasses.toString(),
      icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
      description: "Classes conducted"
    },
    {
      title: "Attendance Rate",
      value: data.averageAttendance.toString(),
      suffix: "%",
      icon: <Users className="h-5 w-5 text-green-500" />,
      description: "Average class attendance"
    },
    {
      title: "Retention Rate",
      value: data.clientRetentionRate.toString(),
      suffix: "%",
      icon: <Award className="h-5 w-5 text-purple-500" />,
      description: "Client retention rate"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            {stat.icon}
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900 mr-1">{stat.value}</span>
            {stat.suffix && <span className="text-gray-500">{stat.suffix}</span>}
          </div>
          <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStatsGrid;
