
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, PersonStanding, Users, Star } from "lucide-react";
import { TrainerPerformanceMetrics } from "@/hooks/trainers/useTrainerPerformance";
import { Skeleton } from "@/components/ui/skeleton";

interface PerformanceStatsGridProps {
  data: TrainerPerformanceMetrics[];
  isLoading: boolean;
}

const PerformanceStatsGrid = ({ data, isLoading }: PerformanceStatsGridProps) => {
  // Calculate overall stats
  const calculateStats = () => {
    if (data.length === 0) {
      return {
        totalClasses: 0,
        avgAttendance: 0,
        avgRetention: 0,
        avgRating: 0
      };
    }

    const totalClasses = data.reduce((sum, item) => sum + item.classes_conducted, 0);
    const avgAttendance = data.reduce((sum, item) => sum + item.attendance_rate, 0) / data.length;
    const avgRetention = data.reduce((sum, item) => sum + item.client_retention_rate, 0) / data.length;
    const avgRating = data.reduce((sum, item) => sum + item.average_rating, 0) / data.length;

    return {
      totalClasses,
      avgAttendance: parseFloat((avgAttendance * 100).toFixed(1)),
      avgRetention: parseFloat((avgRetention * 100).toFixed(1)),
      avgRating: parseFloat(avgRating.toFixed(1))
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Classes"
        value={stats.totalClasses.toString()}
        icon={<CalendarClock className="h-5 w-5 text-blue-500" />}
        description="Classes conducted"
        isLoading={isLoading}
      />
      <StatCard
        title="Avg. Attendance"
        value={`${stats.avgAttendance}%`}
        icon={<PersonStanding className="h-5 w-5 text-green-500" />}
        description="Average class attendance"
        isLoading={isLoading}
      />
      <StatCard
        title="Client Retention"
        value={`${stats.avgRetention}%`}
        icon={<Users className="h-5 w-5 text-purple-500" />}
        description="Returning clients"
        isLoading={isLoading}
      />
      <StatCard
        title="Rating"
        value={`${stats.avgRating}/5`}
        icon={<Star className="h-5 w-5 text-yellow-500" />}
        description="Average client rating"
        isLoading={isLoading}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  isLoading: boolean;
}

const StatCard = ({ title, value, icon, description, isLoading }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              {icon}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceStatsGrid;
