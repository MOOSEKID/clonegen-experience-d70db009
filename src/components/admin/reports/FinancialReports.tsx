
import { useState } from 'react';
import ReportFilters from './filters/ReportFilters';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import RevenueBreakdown from './financial/RevenueBreakdown';
import ExpenseReports from './financial/ExpenseReports';
import ProfitLoss from './financial/ProfitLoss';
import CashFlow from './financial/CashFlow';
import OutstandingInvoices from './financial/OutstandingInvoices';

// Available locations
const locations = [
  { id: 'kigali', label: 'Kigali' },
  { id: 'nyamirambo', label: 'Nyamirambo' },
  { id: 'kimihurura', label: 'Kimihurura' }
];

const FinancialReports = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('revenue');

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
    // Here you'd typically fetch new data based on the date range
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Financial Reports</h2>
      
      <ReportFilters 
        onDateRangeChange={handleDateRangeChange}
        onExport={(format) => console.log(`Export as ${format}`)}
        onSchedule={() => console.log('Schedule reports')}
        availableLocations={locations}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white border overflow-auto">
          <TabsTrigger value="revenue" className="flex-1">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="expenses" className="flex-1">Expenses</TabsTrigger>
          <TabsTrigger value="profitloss" className="flex-1">Profit & Loss</TabsTrigger>
          <TabsTrigger value="cashflow" className="flex-1">Cash Flow</TabsTrigger>
          <TabsTrigger value="invoices" className="flex-1">Outstanding Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="mt-6">
          <RevenueBreakdown fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="expenses" className="mt-6">
          <ExpenseReports fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="profitloss" className="mt-6">
          <ProfitLoss fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="cashflow" className="mt-6">
          <CashFlow fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-6">
          <OutstandingInvoices fromDate={fromDate} toDate={toDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReports;
