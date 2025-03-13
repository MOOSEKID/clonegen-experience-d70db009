
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="flex items-center mt-1 text-sm">
              {change.isPositive ? (
                <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="text-red-500 h-4 w-4 mr-1" />
              )}
              <span className={change.isPositive ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                {change.value}%
              </span>
              <span className="text-gray-500 ml-1">{change.text}</span>
            </div>
          </div>
          <div className={`${iconBgColor} p-3 rounded-full`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
