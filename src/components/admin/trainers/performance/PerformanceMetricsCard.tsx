
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PerformanceMetrics } from '@/hooks/trainers/performance/types';

interface PerformanceMetricsCardProps {
  metric: keyof PerformanceMetrics;
  title: string;
  description?: string;
  value: number | string;
  suffix?: string;
  className?: string;
  formatter?: (value: number | string) => string;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({
  metric,
  title,
  description,
  value,
  suffix = '',
  className = '',
  formatter,
}) => {
  // Default formatter that handles percentages and numbers
  const defaultFormatter = (val: number | string) => {
    if (typeof val === 'number') {
      // If we're dealing with a percentage-like value
      if (metric === 'averageAttendance' || 
          metric === 'clientRetentionRate' || 
          metric === 'completionRate' ||
          metric === 'retentionRate') {
        return `${val.toFixed(0)}%`;
      }
      // For other numeric values
      return val.toString();
    }
    return val;
  };

  // Use provided formatter or fall back to default
  const formattedValue = formatter ? formatter(value) : defaultFormatter(value);
  
  // Get appropriate color based on metric type
  const getCardColor = () => {
    switch (metric) {
      case 'averageRating':
      case 'satisfactionScore':
        return 'bg-blue-50 border-blue-200';
      case 'averageAttendance':
      case 'clientRetentionRate':
      case 'completionRate':
      case 'retentionRate':
        return 'bg-green-50 border-green-200';
      case 'totalClasses':
      case 'assignedClients':
      case 'activeClients':
        return 'bg-purple-50 border-purple-200';
      case 'monthlyGrowth':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  // Handle rendering for different value types
  const renderValue = () => {
    // If value is an array (like monthlySessions), we don't render it
    if (Array.isArray(value)) {
      return "See Chart";
    }
    return formattedValue + suffix;
  };

  return (
    <Card className={`border ${getCardColor()} ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {renderValue()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
