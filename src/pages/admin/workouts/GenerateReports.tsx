
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Download, Calendar, User, Users, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/exportUtils';

// Mock data for reports
const memberProgressData = [
  { name: 'Week 1', completion: 75 },
  { name: 'Week 2', completion: 82 },
  { name: 'Week 3', completion: 65 },
  { name: 'Week 4', completion: 90 },
  { name: 'Week 5', completion: 88 },
  { name: 'Week 6', completion: 95 },
];

const groupProgressData = [
  { name: 'Corporate Team A', completion: 78, members: 12 },
  { name: 'Weight Loss Group', completion: 65, members: 15 },
  { name: 'Senior Fitness', completion: 80, members: 8 },
  { name: 'Youth Athletes', completion: 92, members: 10 },
  { name: 'Rehabilitation', completion: 70, members: 5 },
];

const programCompletionData = [
  { name: 'Strength Builder', completion: 72, enrollments: 45 },
  { name: 'HIIT Challenge', completion: 68, enrollments: 38 },
  { name: 'Weight Loss Program', completion: 85, enrollments: 52 },
  { name: 'Mobility Master', completion: 90, enrollments: 20 },
  { name: 'Core Crusher', completion: 75, enrollments: 32 },
];

// Mock member list
const memberList = [
  { id: 1, name: 'Alex Johnson', program: 'Strength Builder', progress: 72, lastActive: '2 days ago' },
  { id: 2, name: 'Sarah Williams', program: 'Weight Loss Program', progress: 85, lastActive: 'Today' },
  { id: 3, name: 'Mike Chen', program: 'HIIT Challenge', progress: 45, lastActive: '1 week ago' },
  { id: 4, name: 'Linda Garcia', program: 'Mobility Master', progress: 90, lastActive: 'Yesterday' },
  { id: 5, name: 'Robert Kim', program: 'Core Crusher', progress: 60, lastActive: '3 days ago' },
  { id: 6, name: 'Emma Taylor', program: 'Strength Builder', progress: 82, lastActive: 'Today' },
  { id: 7, name: 'Carlos Mendez', program: 'Weight Loss Program', progress: 70, lastActive: '5 days ago' },
  { id: 8, name: 'Sofia Ahmed', program: 'HIIT Challenge', progress: 55, lastActive: '2 weeks ago' },
];

const GenerateReports = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [programFilter, setProgramFilter] = useState('all-programs');
  const [completionFilter, setCompletionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = memberList.filter(member => {
    // Filter by search query
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !member.program.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by completion percentage
    if (completionFilter === 'high' && member.progress < 80) return false;
    if (completionFilter === 'medium' && (member.progress < 50 || member.progress > 79)) return false;
    if (completionFilter === 'low' && member.progress >= 50) return false;
    
    // Filter by program
    if (programFilter !== 'all-programs' && 
        !member.program.toLowerCase().includes(programFilter.replace('-', ' '))) {
      return false;
    }
    
    return true;
  });

  const handleExportPDF = () => {
    if (activeTab === 'members') {
      exportToPDF(
        'Member Progress Report',
        filteredMembers,
        [
          { label: 'Name', key: 'name' },
          { label: 'Program', key: 'program' },
          { label: 'Progress %', key: 'progress' },
          { label: 'Last Active', key: 'lastActive' }
        ]
      );
    } else {
      exportToPDF(
        'Group Progress Report',
        groupProgressData,
        [
          { label: 'Group Name', key: 'name' },
          { label: 'Completion %', key: 'completion' },
          { label: 'Members', key: 'members' }
        ]
      );
    }
    
    toast.success('Report exported successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Workout Reports</h1>
          <p className="text-gray-500">Generate and export detailed workout progress reports</p>
        </div>
        
        <Button variant="outline" onClick={handleExportPDF}>
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Report Settings</CardTitle>
          <CardDescription>Configure your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range" className="w-full">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="program-filter">Program Type</Label>
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger id="program-filter" className="w-full">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-programs">All Programs</SelectItem>
                  <SelectItem value="strength-builder">Strength Builder</SelectItem>
                  <SelectItem value="hiit-challenge">HIIT Challenge</SelectItem>
                  <SelectItem value="weight-loss-program">Weight Loss Program</SelectItem>
                  <SelectItem value="mobility-master">Mobility Master</SelectItem>
                  <SelectItem value="core-crusher">Core Crusher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="completion-filter">Completion %</Label>
              <Select value={completionFilter} onValueChange={setCompletionFilter}>
                <SelectTrigger id="completion-filter" className="w-full">
                  <SelectValue placeholder="All completion rates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Completion Rates</SelectItem>
                  <SelectItem value="high">High (80-100%)</SelectItem>
                  <SelectItem value="medium">Medium (50-79%)</SelectItem>
                  <SelectItem value="low">Low (0-49%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative">
              <Label htmlFor="search-report">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search-report"
                  type="search"
                  placeholder="Search members or programs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Individual Members
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Groups & Teams
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Programs
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Additional Filters
          </Button>
        </div>
        
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Member Progress Overview</CardTitle>
              <CardDescription>Individual progress over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartContainer 
                    config={{
                      completion: { color: "blue" }
                    }}
                  >
                    <AreaChart data={memberProgressData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                      <Legend />
                      <Area type="monotone" dataKey="completion" stroke="#3b82f6" fill="#93c5fd" name="Completion Rate (%)" />
                    </AreaChart>
                  </ChartContainer>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Member Details</CardTitle>
              <CardDescription>Individual member progress and activity</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredMembers.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Program</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.program}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden max-w-32">
                                <div 
                                  className={`h-full rounded-full ${
                                    member.progress >= 80 ? 'bg-green-500' : 
                                    member.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${member.progress}%` }}
                                />
                              </div>
                              <span className="text-sm">{member.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{member.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8 border rounded-md bg-gray-50">
                  <p className="text-gray-500">No members found matching the selected filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Group Progress Overview</CardTitle>
              <CardDescription>Completion rates by group or team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartContainer 
                    config={{
                      completion: { color: "orange" }
                    }}
                  >
                    <BarChart data={groupProgressData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={150} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                      <Legend />
                      <Bar dataKey="completion" fill="#f97316" name="Completion Rate (%)" />
                    </BarChart>
                  </ChartContainer>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Group Details</CardTitle>
              <CardDescription>Performance breakdown by group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Group Name</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupProgressData.map((group, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.members}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden max-w-32">
                              <div 
                                className={`h-full rounded-full ${
                                  group.completion >= 80 ? 'bg-green-500' : 
                                  group.completion >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${group.completion}%` }}
                              />
                            </div>
                            <span className="text-sm">{group.completion}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="programs" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Program Completion Rates</CardTitle>
              <CardDescription>Average completion rates by program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartContainer 
                    config={{
                      completion: { color: "green" }
                    }}
                  >
                    <BarChart data={programCompletionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                      <Legend />
                      <Bar dataKey="completion" fill="#22c55e" name="Completion Rate (%)" />
                    </BarChart>
                  </ChartContainer>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Program Details</CardTitle>
              <CardDescription>Enrollment and completion data by program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Program Name</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programCompletionData.map((program, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>{program.enrollments}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden max-w-32">
                              <div 
                                className={`h-full rounded-full ${
                                  program.completion >= 80 ? 'bg-green-500' : 
                                  program.completion >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${program.completion}%` }}
                              />
                            </div>
                            <span className="text-sm">{program.completion}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenerateReports;
