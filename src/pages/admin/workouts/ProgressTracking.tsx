
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';
import { 
  Area,
  AreaChart,
  Bar, 
  BarChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const progressData = [
  { month: 'Jan', members: 45, completions: 32, completionRate: 71 },
  { month: 'Feb', members: 52, completions: 39, completionRate: 75 },
  { month: 'Mar', members: 61, completions: 42, completionRate: 69 },
  { month: 'Apr', members: 67, completions: 50, completionRate: 75 },
  { month: 'May', members: 72, completions: 58, completionRate: 81 },
  { month: 'Jun', members: 80, completions: 62, completionRate: 78 },
];

const programCompletionData = [
  { name: 'Beginner Strength', completion: 82 },
  { name: 'HIIT Cardio', completion: 76 },
  { name: 'Weight Loss', completion: 68 },
  { name: 'Senior Mobility', completion: 89 },
  { name: 'Core Focus', completion: 75 },
  { name: 'Advanced Strength', completion: 62 },
];

const mockMembers = [
  { id: 1, name: 'Alex Johnson', programName: 'Weight Loss Program', progress: 78, lastActivity: '2 days ago' },
  { id: 2, name: 'Maria Garcia', programName: 'Advanced HIIT', progress: 92, lastActivity: '1 day ago' },
  { id: 3, name: 'Robert Chen', programName: 'Beginner Strength Training', progress: 45, lastActivity: '5 days ago' },
  { id: 4, name: 'Sarah Williams', programName: 'Senior Mobility & Strength', progress: 82, lastActivity: 'Today' },
  { id: 5, name: 'James Davis', programName: 'Advanced HIIT', progress: 35, lastActivity: '1 week ago' }
];

const ProgressTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Progress Tracking</h1>
          <p className="text-gray-500">Monitor member progress on assigned workout programs</p>
        </div>
        
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-green-600">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Assigned Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">143</div>
            <p className="text-sm text-green-600">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76%</div>
            <p className="text-sm text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Program Participation</CardTitle>
            <CardDescription>Members and completion rates over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-end mb-4">
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ChartContainer 
              className="h-72"
              config={{
                members: { color: "blue" },
                completions: { color: "green" }
              }}
            >
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="members" stroke="#3b82f6" fill="#93c5fd" name="Total Members" />
                <Area type="monotone" dataKey="completions" stroke="#10b981" fill="#a7f3d0" name="Completions" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completion Rate by Program</CardTitle>
            <CardDescription>Average completion percentage</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ChartContainer 
              className="h-72"
              config={{
                completion: { color: "orange" }
              }}
            >
              <BarChart data={programCompletionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                <Bar dataKey="completion" fill="#f97316" name="Completion Rate %" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <CardTitle>Member Progress</CardTitle>
              <CardDescription>Track individual member progress on assigned programs</CardDescription>
            </div>
            <div className="relative mt-2 md:mt-0 w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search members..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Program</th>
                  <th className="py-3 px-4 text-left">Progress</th>
                  <th className="py-3 px-4 text-left">Last Activity</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockMembers.map(member => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.programName}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden max-w-32">
                          <div 
                            className={`h-full rounded-full ${
                              member.progress >= 80 ? 'bg-green-500' : 
                              member.progress >= 50 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${member.progress}%` }}
                          />
                        </div>
                        <span className="text-sm">{member.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{member.lastActivity}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracking;
