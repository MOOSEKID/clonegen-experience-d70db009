
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer 
} from 'recharts';
import { ClassAttendanceData } from '@/utils/exportUtils';

const COLORS = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B'];

const chartConfig = {
  class: {
    label: "Classes",
    theme: {
      light: "#10B981",
      dark: "#34D399",
    },
  },
};

interface ClassAttendanceChartProps {
  data: ClassAttendanceData[];
}

const ClassAttendanceChart = ({ data }: ClassAttendanceChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Class Attendance</CardTitle>
        <CardDescription>Distribution by class type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex justify-center">
          <ChartContainer
            config={chartConfig}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassAttendanceChart;
