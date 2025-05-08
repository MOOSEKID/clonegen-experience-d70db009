
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ReportCard from '../ReportCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RevenueBreakdownProps {
  fromDate?: Date;
  toDate?: Date;
}

// Sample revenue categories
const generateRevenueData = () => {
  return [
    { name: 'Jan', memberships: 45000, classes: 12500, personalTraining: 18000, spa: 8500, retail: 6000 },
    { name: 'Feb', memberships: 47000, classes: 13500, personalTraining: 19500, spa: 9000, retail: 5500 },
    { name: 'Mar', memberships: 46500, classes: 14000, personalTraining: 20000, spa: 9500, retail: 6500 },
    { name: 'Apr', memberships: 48000, classes: 14500, personalTraining: 21000, spa: 10000, retail: 7000 },
    { name: 'May', memberships: 49500, classes: 15000, personalTraining: 22000, spa: 10500, retail: 7500 },
    { name: 'Jun', memberships: 51000, classes: 15500, personalTraining: 23000, spa: 11000, retail: 8000 },
  ];
};

// Sample summaries
const generateSummaryData = () => {
  return [
    { category: 'Memberships', amount: 287000, percentage: 58.4 },
    { category: 'Classes', amount: 85000, percentage: 17.3 },
    { category: 'Personal Training', amount: 123500, percentage: 25.1 },
    { category: 'Spa & Wellness', amount: 58500, percentage: 11.9 },
    { category: 'Retail Sales', amount: 40500, percentage: 8.2 },
  ];
};

const RevenueBreakdown = ({ fromDate, toDate }: RevenueBreakdownProps) => {
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [summaryData, setSummaryData] = useState(generateSummaryData());
  
  useEffect(() => {
    // In a real app, this would fetch data based on date range
    setRevenueData(generateRevenueData());
    setSummaryData(generateSummaryData());
  }, [fromDate, toDate]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReportCard 
            title="Monthly Revenue by Category" 
            description="Breakdown of revenue sources over time"
            allowDownload={true}
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${value / 1000}k`}
                    width={50}
                  />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Bar dataKey="memberships" name="Memberships" fill="#8884d8" stackId="a" />
                  <Bar dataKey="classes" name="Classes" fill="#82ca9d" stackId="a" />
                  <Bar dataKey="personalTraining" name="Personal Training" fill="#ffc658" stackId="a" />
                  <Bar dataKey="spa" name="Spa & Wellness" fill="#ff8042" stackId="a" />
                  <Bar dataKey="retail" name="Retail Sales" fill="#0088fe" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ReportCard>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Revenue Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summaryData.map((item) => (
                    <TableRow key={item.category}>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-medium">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">
                      ${summaryData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdown;
