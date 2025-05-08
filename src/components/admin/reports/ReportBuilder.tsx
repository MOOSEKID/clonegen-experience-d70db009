
import { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronRight, Plus, Save } from 'lucide-react';
import ReportFilters from './filters/ReportFilters';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Available datasets
const datasets = [
  { id: 'members', label: 'Members' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'attendance', label: 'Check-ins' },
  { id: 'classes', label: 'Classes' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'goals', label: 'Fitness Goals' },
];

// Available chart types
const chartTypes = [
  { id: 'bar', label: 'Bar Chart' },
  { id: 'line', label: 'Line Chart' },
  { id: 'pie', label: 'Pie Chart' },
  { id: 'table', label: 'Table' },
];

// Available field types
const fieldTypes = {
  members: [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'joinDate', label: 'Join Date' },
    { id: 'membershipType', label: 'Membership Type' },
    { id: 'status', label: 'Status' },
    { id: 'lastCheckIn', label: 'Last Check-in' },
  ],
  revenue: [
    { id: 'date', label: 'Date' },
    { id: 'amount', label: 'Amount' },
    { id: 'category', label: 'Category' },
    { id: 'paymentMethod', label: 'Payment Method' },
    { id: 'memberId', label: 'Member ID' },
  ],
  attendance: [
    { id: 'date', label: 'Date' },
    { id: 'memberId', label: 'Member ID' },
    { id: 'checkInTime', label: 'Check-in Time' },
    { id: 'checkOutTime', label: 'Check-out Time' },
    { id: 'location', label: 'Location' },
  ],
};

const ReportBuilder = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedChartType, setSelectedChartType] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [reportName, setReportName] = useState('');
  const [emailSchedule, setEmailSchedule] = useState(false);

  const handleFieldToggle = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const handleDatasetChange = (value: string) => {
    setSelectedDataset(value);
    setSelectedFields([]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Custom Report Builder</h2>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="new">New Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Report</CardTitle>
              <CardDescription>Select data source, fields, and visualization type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input 
                      id="report-name" 
                      placeholder="My Custom Report" 
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dataset">Choose Dataset</Label>
                    <Select value={selectedDataset} onValueChange={handleDatasetChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dataset" />
                      </SelectTrigger>
                      <SelectContent>
                        {datasets.map(dataset => (
                          <SelectItem key={dataset.id} value={dataset.id}>
                            {dataset.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="chart-type">Visualization Type</Label>
                    <Select 
                      value={selectedChartType} 
                      onValueChange={setSelectedChartType}
                      disabled={!selectedDataset}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select chart type" />
                      </SelectTrigger>
                      <SelectContent>
                        {chartTypes.map(chartType => (
                          <SelectItem key={chartType.id} value={chartType.id}>
                            {chartType.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="email-schedule" checked={emailSchedule} onCheckedChange={setEmailSchedule} />
                    <Label htmlFor="email-schedule">Schedule email delivery of this report</Label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Select Fields</Label>
                  <div className="border rounded-md p-4 max-h-64 overflow-y-auto space-y-2">
                    {selectedDataset ? (
                      fieldTypes[selectedDataset]?.map(field => (
                        <div key={field.id} className="flex items-center space-x-2">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer ${
                              selectedFields.includes(field.id) 
                                ? "bg-primary border-primary" 
                                : "border-gray-300"
                            }`}
                            onClick={() => handleFieldToggle(field.id)}
                          >
                            {selectedFields.includes(field.id) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>{field.label}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-center py-8">
                        Select a dataset to see available fields
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <Label>Date Range</Label>
                <ReportFilters 
                  onDateRangeChange={() => {}}
                  onExport={() => {}}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Template
                </Button>
                <Button disabled={!selectedDataset || !selectedChartType || selectedFields.length === 0}>
                  Generate Report
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Saved Reports</h3>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example saved reports */}
            {[
              { name: "Monthly Revenue Analysis", type: "Bar Chart", dataset: "Revenue", lastRun: "2023-05-01" },
              { name: "Member Attendance Trends", type: "Line Chart", dataset: "Check-ins", lastRun: "2023-05-02" },
              { name: "Class Popularity Report", type: "Pie Chart", dataset: "Classes", lastRun: "2023-05-03" },
              { name: "Trainer Performance", type: "Table", dataset: "Trainers", lastRun: "2023-05-04" },
            ].map((report, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{report.name}</CardTitle>
                  <CardDescription>{report.type} • {report.dataset}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  <span className="text-xs text-gray-500">Last run: {report.lastRun}</span>
                  <Button variant="outline" size="sm">Run Report</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportBuilder;
