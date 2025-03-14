
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { TrainerPerformanceMetrics } from "@/hooks/trainers/useTrainerPerformance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface PerformanceMetricsCardProps {
  data: TrainerPerformanceMetrics[];
  isLoading: boolean;
}

const PerformanceMetricsCard = ({ data, isLoading }: PerformanceMetricsCardProps) => {
  // Format data for charts
  const formatChartData = () => {
    return [...data]
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .map(item => ({
        month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        classes: item.classes_conducted,
        attendance: parseFloat((item.attendance_rate * 100).toFixed(1)),
        retention: parseFloat((item.client_retention_rate * 100).toFixed(1)),
        rating: parseFloat(item.average_rating.toFixed(1))
      }));
  };

  const chartData = formatChartData();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Monthly performance tracking and trends</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-gray-500 text-center p-4 border border-dashed rounded-md">
            <div>
              <p>No performance data available yet.</p>
              <p className="text-sm mt-1">Data will appear once the trainer has conducted classes.</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="attendance">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="attendance" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Attendance Rate']} />
                  <Legend />
                  <Line type="monotone" dataKey="attendance" stroke="#0ea5e9" name="Attendance Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="classes" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="classes" fill="#f97316" name="Classes Conducted" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="retention" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Client Retention']} />
                  <Legend />
                  <Line type="monotone" dataKey="retention" stroke="#22c55e" name="Client Retention (%)" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="ratings" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rating" stroke="#a855f7" name="Average Rating (1-5)" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
