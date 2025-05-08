
import { useState, useEffect } from 'react';
import ReportCard from '../ReportCard';
import { ArrowUp, ArrowDown, Users, UserCheck, UserX, UserPlus, UserMinus, Building } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface MembershipOverviewProps {
  fromDate?: Date;
  toDate?: Date;
}

// Sample membership metrics
const generateMembershipMetrics = () => {
  return [
    { 
      title: 'Total Members', 
      value: 1287, 
      change: 7.2, 
      trend: 'up',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      title: 'Active Members',
      value: 1058, 
      change: 5.5, 
      trend: 'up',
      icon: UserCheck,
      color: 'bg-green-100 text-green-600'
    },
    { 
      title: 'Inactive Members', 
      value: 229, 
      change: -3.1, 
      trend: 'down',
      icon: UserX,
      color: 'bg-gray-100 text-gray-600'
    },
    { 
      title: 'New Members (MTD)', 
      value: 78, 
      change: 12.8, 
      trend: 'up',
      icon: UserPlus,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      title: 'Cancelled (MTD)', 
      value: 23, 
      change: -8.4, 
      trend: 'down',
      icon: UserMinus,
      color: 'bg-red-100 text-red-600'
    },
    { 
      title: 'Company Accounts', 
      value: 24, 
      change: 4.0, 
      trend: 'up',
      icon: Building,
      color: 'bg-amber-100 text-amber-600'
    },
  ];
};

// Sample membership trend data
const generateTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map(name => ({
    name,
    active: Math.floor(Math.random() * 200) + 900,
    new: Math.floor(Math.random() * 50) + 50,
    cancelled: Math.floor(Math.random() * 20) + 10,
  }));
};

// Sample membership source data
const generateSourceData = () => {
  return [
    { source: "Referrals", value: 42 },
    { source: "Walk-ins", value: 28 },
    { source: "Website", value: 15 },
    { source: "Social Media", value: 10 },
    { source: "Promotions", value: 5 },
  ];
};

const MembershipOverview = ({ fromDate, toDate }: MembershipOverviewProps) => {
  const [metrics, setMetrics] = useState(generateMembershipMetrics());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [sourceData, setSourceData] = useState(generateSourceData());

  useEffect(() => {
    // In a real app, this would fetch data based on date range
    setMetrics(generateMembershipMetrics());
    setTrendData(generateTrendData());
    setSourceData(generateSourceData());
  }, [fromDate, toDate]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <ArrowUp className="text-green-500 h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="text-red-500 h-4 w-4 mr-1" />
                  )}
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(metric.change)}% {metric.trend === 'up' ? 'increase' : 'decrease'}
                  </span>
                </div>
              </div>
              <div className={`rounded-full p-2.5 ${metric.color}`}>
                <metric.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReportCard 
            title="Membership Trends" 
            description="Active, new, and cancelled memberships over time"
            allowDownload={true}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
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
                  <Line type="monotone" dataKey="active" name="Active Members" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="new" name="New Members" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ReportCard>
        </div>
        
        <div className="lg:col-span-1">
          <ReportCard 
            title="Member Sources" 
            description="Where new members are coming from"
            allowDownload={true}
          >
            <div className="h-80 pl-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sourceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 50,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="source" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value} members`, 'Count']} />
                  <Legend />
                  <Bar dataKey="value" name="Source" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ReportCard>
        </div>
      </div>
    </div>
  );
};

export default MembershipOverview;
