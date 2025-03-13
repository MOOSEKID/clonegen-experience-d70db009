
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
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  XAxis, 
  YAxis 
} from 'recharts';
import { RevenueData } from '@/utils/exportUtils';

const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "#3B82F6",
      dark: "#60A5FA",
    },
  },
};

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue in USD</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={chartConfig}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent labelKey="revenue" />}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
