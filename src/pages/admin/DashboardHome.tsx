
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Users, Dumbbell, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const memberData = [
  { month: 'Jan', active: 120, new: 20 },
  { month: 'Feb', active: 125, new: 15 },
  { month: 'Mar', active: 135, new: 18 },
  { month: 'Apr', active: 140, new: 12 },
  { month: 'May', active: 150, new: 22 },
  { month: 'Jun', active: 160, new: 18 },
];

const classAttendanceData = [
  { name: 'Yoga', value: 35 },
  { name: 'Spin', value: 28 },
  { name: 'HIIT', value: 22 },
  { name: 'Pilates', value: 15 },
  { name: 'Boxing', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const revenueData = [
  { month: 'Jan', revenue: 25000 },
  { month: 'Feb', revenue: 26000 },
  { month: 'Mar', revenue: 28500 },
  { month: 'Apr', revenue: 27000 },
  { month: 'May', revenue: 30000 },
  { month: 'Jun', revenue: 32000 },
];

const recentActivities = [
  { id: 1, type: 'signup', user: 'Jane Smith', time: '10 minutes ago' },
  { id: 2, type: 'class_booking', user: 'Mark Johnson', class: 'Yoga', time: '25 minutes ago' },
  { id: 3, type: 'trainer_assigned', user: 'Amy Roberts', trainer: 'Michael Brown', time: '1 hour ago' },
  { id: 4, type: 'payment', user: 'David Wilson', amount: '$120.00', time: '2 hours ago' },
  { id: 5, type: 'renewal', user: 'Sarah Thompson', plan: 'Annual Membership', time: '3 hours ago' },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Members</CardTitle>
            <Users className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Trainers</CardTitle>
            <Dumbbell className="h-4 w-4 text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2
              </span>{' '}
              new this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Classes Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
            <p className="text-xs text-gray-400">
              <span className="text-red-400 inline-flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
            <Activity className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,450</div>
            <p className="text-xs text-gray-400">
              <span className="text-green-400 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.4%
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="members">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="members">Member Growth</TabsTrigger>
          <TabsTrigger value="classes">Class Attendance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Member Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memberData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Bar dataKey="active" name="Active Members" fill="#8884d8" />
                    <Bar dataKey="new" name="New Members" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classes" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Class Attendance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={classAttendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {classAttendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="pt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value) => [`$${value}`, 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#82ca9d" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="bg-gray-700 p-3 rounded-lg">
                {activity.type === 'signup' && (
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-500/20 p-2 mr-3">
                      <Users className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        New member <span className="font-medium">{activity.user}</span> signed up
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                )}
                
                {activity.type === 'class_booking' && (
                  <div className="flex items-center">
                    <div className="rounded-full bg-blue-500/20 p-2 mr-3">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> booked a{' '}
                        <span className="font-medium">{activity.class}</span> class
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                )}
                
                {activity.type === 'trainer_assigned' && (
                  <div className="flex items-center">
                    <div className="rounded-full bg-purple-500/20 p-2 mr-3">
                      <Dumbbell className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> assigned to trainer{' '}
                        <span className="font-medium">{activity.trainer}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                )}
                
                {activity.type === 'payment' && (
                  <div className="flex items-center">
                    <div className="rounded-full bg-yellow-500/20 p-2 mr-3">
                      <Activity className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> made a payment of{' '}
                        <span className="font-medium">{activity.amount}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                )}
                
                {activity.type === 'renewal' && (
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-500/20 p-2 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> renewed{' '}
                        <span className="font-medium">{activity.plan}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
