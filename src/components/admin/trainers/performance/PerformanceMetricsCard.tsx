
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceMetrics } from "@/hooks/trainers/useTrainerPerformance";
import { Skeleton } from "@/components/ui/skeleton";

interface PerformanceMetricsCardProps {
  data: PerformanceMetrics;
  isLoading: boolean;
}

const PerformanceMetricsCard = ({ data, isLoading }: PerformanceMetricsCardProps) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Monthly Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[200px] w-full" />
        ) : (
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlySessions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  formatter={(value) => [`${value} classes`, 'Classes Conducted']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
