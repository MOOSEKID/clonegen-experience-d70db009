
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, TrendingUp, BarChart } from 'lucide-react';
import { PerformanceMetrics } from '@/hooks/trainers/performance/types';

interface PerformanceStatsGridProps {
  metrics: PerformanceMetrics;
  isLoading?: boolean;
}

const PerformanceStatsGrid: React.FC<PerformanceStatsGridProps> = ({ metrics, isLoading = false }) => {
  if (isLoading) {
    return <div>Loading performance metrics...</div>;
  }

  // Function to render the stats card
  const renderStatsCard = (
    icon: React.ReactNode,
    label: string,
    value: string | number,
    bgColor: string,
    textColor: string
  ) => {
    // Handle rendering for different value types
    const renderValue = () => {
      // If value is an array (like monthlySessions), we don't render it
      if (Array.isArray(value)) {
        return "See Chart";
      }
      return value;
    };

    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 flex items-center space-x-4">
          <div className={`p-3 rounded-full ${bgColor}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`text-2xl font-bold ${textColor}`}>{renderValue()}</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {renderStatsCard(
        <Users className="h-5 w-5 text-blue-600" />,
        'Active Clients',
        metrics.activeClients || 0,
        'bg-blue-100',
        'text-blue-600'
      )}
      
      {renderStatsCard(
        <Award className="h-5 w-5 text-green-600" />,
        'Satisfaction',
        `${metrics.satisfactionScore || 0}%`,
        'bg-green-100',
        'text-green-600'
      )}
      
      {renderStatsCard(
        <TrendingUp className="h-5 w-5 text-amber-600" />,
        'Monthly Growth',
        `${metrics.monthlyGrowth || 0}%`,
        'bg-amber-100',
        'text-amber-600'
      )}
      
      {renderStatsCard(
        <BarChart className="h-5 w-5 text-purple-600" />,
        'Retention Rate',
        `${metrics.retentionRate || 0}%`,
        'bg-purple-100',
        'text-purple-600'
      )}
    </div>
  );
};

export default PerformanceStatsGrid;
