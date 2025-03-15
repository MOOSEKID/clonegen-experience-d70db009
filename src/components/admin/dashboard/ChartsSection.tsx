
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the data types
export interface MembershipData {
  month: string;
  active: number;
  canceled: number;
  total: number;
}

export interface RevenueData {
  month: string;
  memberships: number;
  classes: number;
  other: number;
  total: number;
}

// Helper function to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0
  }).format(value);
};

interface ChartsSectionProps {
  membershipData?: MembershipData[];
  revenueData?: RevenueData[];
}

const ChartsSection = ({ membershipData = [], revenueData = [] }: ChartsSectionProps) => {
  // Revenue distribution for pie chart
  const revenueDistribution = [
    { name: 'Memberships', value: revenueData.reduce((sum, item) => sum + item.memberships, 0) },
    { name: 'Classes', value: revenueData.reduce((sum, item) => sum + item.classes, 0) },
    { name: 'Other', value: revenueData.reduce((sum, item) => sum + item.other, 0) }
  ];
  
  const COLORS = ['#FF9F29', '#27374D', '#526D82'];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Membership Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Membership Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="line">
            <TabsList className="mb-4">
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
            <TabsContent value="line" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={membershipData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, 'Members']} />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#FF9F29" strokeWidth={2} />
                  <Line type="monotone" dataKey="active" stroke="#27374D" strokeWidth={2} />
                  <Line type="monotone" dataKey="canceled" stroke="#9DB2BF" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="bar" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={membershipData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}`, 'Members']} />
                  <Legend />
                  <Bar dataKey="active" name="Active" fill="#27374D" />
                  <Bar dataKey="canceled" name="Canceled" fill="#9DB2BF" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar">
            <TabsList className="mb-4">
              <TabsTrigger value="bar">Bar</TabsTrigger>
              <TabsTrigger value="pie">Distribution</TabsTrigger>
            </TabsList>
            <TabsContent value="bar" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                  <Legend />
                  <Bar dataKey="memberships" name="Memberships" fill="#FF9F29" />
                  <Bar dataKey="classes" name="Classes" fill="#27374D" />
                  <Bar dataKey="other" name="Other" fill="#526D82" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="pie" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
