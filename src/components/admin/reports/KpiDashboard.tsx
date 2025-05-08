
import { useState } from 'react';
import ReportFilters from './filters/ReportFilters';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, DollarSign, Users, Calendar, Clock, BarChart2, TrendingUp } from 'lucide-react';
import RevenueChart from './charts/RevenueChart';
import MembershipChart from './charts/MembershipChart';
import ClassAttendanceChart from './charts/ClassAttendanceChart';
import { exportToPDF } from '@/utils/exportUtils';

// Mock data for KPI metrics
const kpiMetrics = [
  { 
    title: 'Revenue per Member', 
    value: '$129.50', 
    change: 5.2, 
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    title: 'Lifetime Value',
    value: '$2,450', 
    change: 3.1, 
    trend: 'up',
    icon: DollarSign,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    title: 'Acquisition Cost', 
    value: '$75.20', 
    change: -2.3, 
    trend: 'down',
    icon: DollarSign,
    color: 'bg-emerald-100 text-emerald-600'
  },
  { 
    title: 'Active Member %', 
    value: '78.3%', 
    change: 1.8, 
    trend: 'up',
    icon: Users,
    color: 'bg-amber-100 text-amber-600'
  },
  { 
    title: 'Monthly Visits/Member', 
    value: '12.5', 
    change: 8.4, 
    trend: 'up',
    icon: Calendar,
    color: 'bg-sky-100 text-sky-600'
  },
  { 
    title: 'Class Utilization', 
    value: '65.2%', 
    change: -3.5, 
    trend: 'down',
    icon: Clock,
    color: 'bg-rose-100 text-rose-600'
  },
  { 
    title: 'Trainer Utilization', 
    value: '82.1%', 
    change: 2.7, 
    trend: 'up',
    icon: BarChart2,
    color: 'bg-fuchsia-100 text-fuchsia-600'
  },
  { 
    title: 'Revenue per Sqm', 
    value: '$26.80', 
    change: 4.9, 
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-lime-100 text-lime-600'
  }
];

// Available locations
const locations = [
  { id: 'kigali', label: 'Kigali' },
  { id: 'nyamirambo', label: 'Nyamirambo' },
  { id: 'kimihurura', label: 'Kimihurura' }
];

// Available membership types
const membershipTypes = [
  { id: 'basic', label: 'Basic' },
  { id: 'premium', label: 'Premium' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'student', label: 'Student' }
];

const KpiDashboard = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
    // Here you'd typically fetch new data based on the date range
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      // Here you'd typically fetch fresh data
    }, 1000);
  };

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    if (format === 'pdf') {
      exportToPDF('KPI Dashboard', kpiMetrics, [
        { label: 'Metric', key: 'title' },
        { label: 'Value', key: 'value' },
        { label: 'Change (%)', key: 'change' }
      ]);
    }
    // Add handlers for CSV and Excel exports
  };

  return (
    <div className="space-y-6">
      <ReportFilters 
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
        onSchedule={() => console.log('Schedule reports')}
        availableLocations={locations}
        availableMembershipTypes={membershipTypes}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
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
                    {metric.change}% from last period
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
        <div className="lg:col-span-1">
          <RevenueChart fromDate={fromDate} toDate={toDate} isLoading={isRefreshing} />
        </div>
        <div className="lg:col-span-1">
          <MembershipChart fromDate={fromDate} toDate={toDate} isLoading={isRefreshing} />
        </div>
        <div className="lg:col-span-1">
          <ClassAttendanceChart fromDate={fromDate} toDate={toDate} isLoading={isRefreshing} />
        </div>
      </div>
    </div>
  );
};

export default KpiDashboard;
