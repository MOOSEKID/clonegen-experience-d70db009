
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrainerPerformance } from "@/hooks/trainers/useTrainerPerformance";
import { Skeleton } from "@/components/ui/skeleton";

interface PerformanceMetricsCardProps {
  trainerId: string;
  trainerName: string;
  fullView?: boolean;
}

const PerformanceMetricsCard = ({ trainerId, trainerName, fullView = false }: PerformanceMetricsCardProps) => {
  const { metrics, isLoading } = useTrainerPerformance(trainerId);

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
              <BarChart data={metrics.monthlySessions}>
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
        
        {fullView && (
          <div className="mt-6 space-y-4">
            <h3 className="text-md font-medium">Additional Performance Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Client Retention</p>
                <p className="text-xl font-bold">{metrics.clientRetentionRate}%</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-xl font-bold">{metrics.averageRating.toFixed(1)}</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Sessions This Month</p>
                <p className="text-xl font-bold">{metrics.thisMonthSessions}</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-xl font-bold">{metrics.attendanceRate}%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
