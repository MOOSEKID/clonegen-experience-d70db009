
import { useState, useEffect } from 'react';
import ReportCard from '../ReportCard';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DailyCheckInsProps {
  fromDate?: Date;
  toDate?: Date;
}

// Generate daily check-in data
const generateDailyData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const data = [];
  
  weeks.forEach(week => {
    days.forEach(day => {
      data.push({
        name: `${day}`,
        week,
        checkIns: Math.floor(Math.random() * 100) + 50,
        uniqueMembers: Math.floor(Math.random() * 80) + 40,
      });
    });
  });
  
  return data;
};

// Generate hourly distribution data
const generateHourlyData = () => {
  const hours = [];
  for (let i = 6; i <= 22; i++) {
    const hourLabel = i < 12 ? `${i}AM` : i === 12 ? '12PM' : `${i-12}PM`;
    hours.push({
      hour: hourLabel,
      checkIns: Math.floor(Math.random() * 60) + 5,
    });
  }
  return hours;
};

// Generate top days data
const generateTopDaysData = () => {
  return [
    { day: 'Monday', checkIns: 145 },
    { day: 'Tuesday', checkIns: 132 },
    { day: 'Wednesday', checkIns: 168 },
    { day: 'Thursday', checkIns: 157 },
    { day: 'Friday', checkIns: 126 },
    { day: 'Saturday', checkIns: 110 },
    { day: 'Sunday', checkIns: 85 },
  ].sort((a, b) => b.checkIns - a.checkIns);
};

const DailyCheckIns = ({ fromDate, toDate }: DailyCheckInsProps) => {
  const [dailyData, setDailyData] = useState(generateDailyData());
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  const [topDaysData, setTopDaysData] = useState(generateTopDaysData());

  useEffect(() => {
    // In a real app, this would fetch data based on date range
    setDailyData(generateDailyData());
    setHourlyData(generateHourlyData());
    setTopDaysData(generateTopDaysData());
  }, [fromDate, toDate]);

  const totalCheckIns = dailyData.reduce((sum, item) => sum + item.checkIns, 0);
  const uniqueMembers = dailyData.reduce((sum, item) => sum + item.uniqueMembers, 0) / 4; // Divided by 4 to account for weeks
  const averageCheckIns = Math.round(totalCheckIns / dailyData.length);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Check-ins</div>
          <div className="text-2xl font-bold mt-1">{totalCheckIns.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-2">During selected period</div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Unique Members</div>
          <div className="text-2xl font-bold mt-1">{Math.round(uniqueMembers).toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-2">Active members that checked in</div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Average Daily Check-ins</div>
          <div className="text-2xl font-bold mt-1">{averageCheckIns.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-2">Per day during period</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReportCard 
            title="Daily Check-ins" 
            description="Member check-ins by day"
            allowDownload={true}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="checkIns" name="Check-ins" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="uniqueMembers" name="Unique Members" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ReportCard>
        </div>
        
        <div className="lg:col-span-1">
          <ReportCard 
            title="Peak Hours" 
            description="Member check-ins by hour of day"
            allowDownload={true}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hourlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="checkIns" name="Check-ins" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ReportCard>
        </div>
      </div>

      <ReportCard 
        title="Check-ins Ranking" 
        description="Most popular days for check-ins"
        allowDownload={true}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead className="text-right">Check-ins</TableHead>
              <TableHead className="text-right">% of Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDaysData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.day}</TableCell>
                <TableCell className="text-right">{item.checkIns.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {(item.checkIns / topDaysData.reduce((sum, day) => sum + day.checkIns, 0) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ReportCard>
    </div>
  );
};

export default DailyCheckIns;
