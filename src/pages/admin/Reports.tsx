
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FinancialReports from "@/components/admin/reports/FinancialReports";
import MembershipAnalytics from "@/components/admin/reports/MembershipAnalytics";
import AttendanceReports from "@/components/admin/reports/AttendanceReports";
import FitnessGoalsAnalytics from "@/components/admin/reports/FitnessGoalsAnalytics";
import KpiDashboard from "@/components/admin/reports/KpiDashboard";
import ReportBuilder from "@/components/admin/reports/ReportBuilder";
import AlertSettings from "@/components/admin/reports/AlertSettings";

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState("kpi");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive data insights to drive business decisions</p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="border-b mb-4">
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start">
            <TabsTrigger value="kpi" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">KPI Dashboard</TabsTrigger>
            <TabsTrigger value="financial" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">Financial</TabsTrigger>
            <TabsTrigger value="membership" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">Membership</TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">Attendance</TabsTrigger>
            <TabsTrigger value="fitness" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">Fitness Goals</TabsTrigger>
            <TabsTrigger value="builder" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">Report Builder</TabsTrigger>
            <TabsTrigger value="alerts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gym-orange">Alerts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="kpi" className="space-y-4">
          <KpiDashboard />
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <FinancialReports />
        </TabsContent>
        
        <TabsContent value="membership" className="space-y-4">
          <MembershipAnalytics />
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <AttendanceReports />
        </TabsContent>
        
        <TabsContent value="fitness" className="space-y-4">
          <FitnessGoalsAnalytics />
        </TabsContent>
        
        <TabsContent value="builder" className="space-y-4">
          <ReportBuilder />
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <AlertSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
