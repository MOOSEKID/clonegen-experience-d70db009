
import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  Clock, 
  DollarSign,
  FileText,
  ArrowUp,
  ArrowDown,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  Area,
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

// Mock data for charts
const membershipData = [
  { name: 'Jan', members: 400 },
  { name: 'Feb', members: 500 },
  { name: 'Mar', members: 600 },
  { name: 'Apr', members: 700 },
  { name: 'May', members: 800 },
  { name: 'Jun', members: 950 },
];

const revenueData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 15000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 20000 },
  { name: 'May', revenue: 22000 },
  { name: 'Jun', revenue: 25000 },
];

const classAttendanceData = [
  { name: 'Yoga', value: 30 },
  { name: 'HIIT', value: 25 },
  { name: 'Cardio', value: 20 },
  { name: 'Weight', value: 15 },
  { name: 'Zumba', value: 10 },
];

const COLORS = ['#8B5CF6', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B'];

const chartConfig = {
  members: {
    label: "Members",
    theme: {
      light: "#8B5CF6",
      dark: "#A78BFA",
    },
  },
  revenue: {
    label: "Revenue",
    theme: {
      light: "#3B82F6",
      dark: "#60A5FA",
    },
  },
  class: {
    label: "Classes",
    theme: {
      light: "#10B981",
      dark: "#34D399",
    },
  },
};

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Overview of your gym's performance and metrics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {timeFilter === 'daily' && 'Daily'}
                {timeFilter === 'weekly' && 'Weekly'}
                {timeFilter === 'monthly' && 'Monthly'}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTimeFilter('daily')}>
                Daily
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter('weekly')}>
                Weekly
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter('monthly')}>
                Monthly
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">1,287</div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">$25,698</div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">8.2%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Class Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">548</div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
                  <span className="text-green-500 font-medium">5.3%</span>
                  <span className="text-gray-500 ml-1">from last week</span>
                </div>
              </div>
              <div className="bg-cyan-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Daily Check-ins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-3xl font-bold">142</div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDown className="text-red-500 h-4 w-4 mr-1" />
                  <span className="text-red-500 font-medium">3.1%</span>
                  <span className="text-gray-500 ml-1">from yesterday</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    data={membershipData}
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
                    data={revenueData}
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
      </div>

      {/* Additional row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      data={classAttendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {classAttendanceData.map((entry, index) => (
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

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest gym activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${i % 2 === 0 ? 'bg-purple-100' : 'bg-blue-100'}`}>
                    {i % 2 === 0 ? 
                      <Users className={`h-5 w-5 text-purple-600`} /> : 
                      <CreditCard className={`h-5 w-5 text-blue-600`} />
                    }
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {i % 2 === 0 ? 'New member registration' : 'Payment received'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {i % 2 === 0 ? 'John Smith joined Basic membership' : 'Sarah Johnson - $59.99 Monthly Plan'}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {i === 1 ? 'Just now' : `${i} hour${i > 1 ? 's' : ''} ago`}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
