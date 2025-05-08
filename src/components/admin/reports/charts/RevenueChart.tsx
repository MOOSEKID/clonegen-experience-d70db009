
import { useState, useEffect } from "react";
import ReportCard from "../ReportCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  fromDate?: Date;
  toDate?: Date;
  isLoading?: boolean;
}

// Sample revenue data
const generateRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = months.map((name) => ({
    name,
    revenue: Math.floor(Math.random() * 20000) + 15000,
  }));
  return data;
};

const RevenueChart = ({ fromDate, toDate, isLoading = false }: RevenueChartProps) => {
  const [data, setData] = useState(generateRevenueData());
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch data based on date range
    // For now, we'll just regenerate random data when the dates change
    const newData = generateRevenueData();
    setData(newData);
    
    // Calculate total revenue
    const sum = newData.reduce((acc, item) => acc + item.revenue, 0);
    setTotalRevenue(sum);
  }, [fromDate, toDate]);

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <ReportCard 
      title="Monthly Revenue" 
      description={`Total: ${formatCurrency(totalRevenue)}`}
      allowDownload={true}
      allowDateRange={true}
      isLoading={isLoading}
      infoTooltip="Monthly revenue breakdown across all services"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 12}} />
            <YAxis 
              tickFormatter={(value) => `$${value / 1000}k`}
              tick={{fontSize: 12}}
              width={50}
            />
            <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, 'Revenue']} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8b5cf6" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ReportCard>
  );
};

export default RevenueChart;
