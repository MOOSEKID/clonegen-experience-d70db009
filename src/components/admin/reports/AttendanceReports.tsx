
import { useState } from 'react';
import ReportFilters from './filters/ReportFilters';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import DailyCheckIns from './attendance/DailyCheckIns';
import ClassAttendance from './attendance/ClassAttendance';
import NoShowTracking from './attendance/NoShowTracking';
import FacilityUsage from './attendance/FacilityUsage';

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

const AttendanceReports = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('daily');

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
    // Here you'd typically fetch new data based on the date range
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Attendance Reports</h2>
      
      <ReportFilters 
        onDateRangeChange={handleDateRangeChange}
        onExport={(format) => console.log(`Export as ${format}`)}
        onSchedule={() => console.log('Schedule reports')}
        availableLocations={locations}
        availableMembershipTypes={membershipTypes}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white border overflow-auto">
          <TabsTrigger value="daily" className="flex-1">Daily Check-ins</TabsTrigger>
          <TabsTrigger value="class" className="flex-1">Class Attendance</TabsTrigger>
          <TabsTrigger value="noshow" className="flex-1">No-Show Tracking</TabsTrigger>
          <TabsTrigger value="facility" className="flex-1">Facility Usage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="mt-6">
          <DailyCheckIns fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="class" className="mt-6">
          <ClassAttendance fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="noshow" className="mt-6">
          <NoShowTracking fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="facility" className="mt-6">
          <FacilityUsage fromDate={fromDate} toDate={toDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceReports;
