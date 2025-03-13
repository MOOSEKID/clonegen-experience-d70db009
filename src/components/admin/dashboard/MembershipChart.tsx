
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
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  XAxis, 
  YAxis 
} from 'recharts';
import { MembershipData } from '@/utils/exportUtils';

const chartConfig = {
  members: {
    label: "Members",
    theme: {
      light: "#8B5CF6",
      dark: "#A78BFA",
    },
  },
};

interface MembershipChartProps {
  data: MembershipData[];
}

const MembershipChart = ({ data }: MembershipChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Growth</CardTitle>
        <CardDescription>Total member count over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={chartConfig}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent labelKey="members" />}
                />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipChart;
