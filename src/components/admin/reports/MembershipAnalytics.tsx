
import { useState } from 'react';
import ReportFilters from './filters/ReportFilters';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import MembershipOverview from './membership/MembershipOverview';
import RetentionChart from './membership/RetentionChart';
import DemographicsChart from './membership/DemographicsChart';
import CompanyAccountsTable from './membership/CompanyAccountsTable';

// Available membership types
const membershipTypes = [
  { id: 'basic', label: 'Basic' },
  { id: 'premium', label: 'Premium' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'student', label: 'Student' }
];

const MembershipAnalytics = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
    // Here you'd typically fetch new data based on the date range
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Membership Analytics</h2>
      
      <ReportFilters 
        onDateRangeChange={handleDateRangeChange}
        onExport={(format) => console.log(`Export as ${format}`)}
        onSchedule={() => console.log('Schedule reports')}
        availableMembershipTypes={membershipTypes}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white border overflow-auto">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="retention" className="flex-1">Retention</TabsTrigger>
          <TabsTrigger value="demographics" className="flex-1">Demographics</TabsTrigger>
          <TabsTrigger value="companies" className="flex-1">Company Accounts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <MembershipOverview fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="retention" className="mt-6">
          <RetentionChart fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="demographics" className="mt-6">
          <DemographicsChart fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="companies" className="mt-6">
          <CompanyAccountsTable fromDate={fromDate} toDate={toDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MembershipAnalytics;
