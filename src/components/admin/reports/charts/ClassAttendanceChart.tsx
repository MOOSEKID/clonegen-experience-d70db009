
import { useState, useEffect } from "react";
import ReportCard from "../ReportCard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ClassAttendanceChartProps {
  fromDate?: Date;
  toDate?: Date;
  isLoading?: boolean;
}

interface ClassData {
  name: string;
  value: number;
  capacity: number;
  color: string;
}

const COLORS = ['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

// Sample class attendance data
const generateClassData = (): ClassData[] => {
  const classes = [
    { name: 'CrossFit', color: COLORS[0] },
    { name: 'Yoga', color: COLORS[1] },
    { name: 'Spinning', color: COLORS[2] },
    { name: 'HIIT', color: COLORS[3] },
    { name: 'Pilates', color: COLORS[4] },
  ];
  
  return classes.map(cls => ({
    name: cls.name,
    value: Math.floor(Math.random() * 50) + 30, // Attendance
    capacity: Math.floor(Math.random() * 30) + 60, // Capacity
    color: cls.color
  }));
};

const ClassAttendanceChart = ({ fromDate, toDate, isLoading = false }: ClassAttendanceChartProps) => {
  const [data, setData] = useState<ClassData[]>(generateClassData());
  const [totalAttendance, setTotalAttendance] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch data based on date range
    const newData = generateClassData();
    setData(newData);
    setTotalAttendance(newData.reduce((sum, item) => sum + item.value, 0));
  }, [fromDate, toDate]);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const config = {
    CrossFit: { theme: { light: '#8b5cf6', dark: '#8b5cf6' } },
    Yoga: { theme: { light: '#10b981', dark: '#10b981' } },
    Spinning: { theme: { light: '#3b82f6', dark: '#3b82f6' } },
    HIIT: { theme: { light: '#f59e0b', dark: '#f59e0b' } },
    Pilates: { theme: { light: '#ef4444', dark: '#ef4444' } },
  };

  return (
    <ReportCard 
      title="Class Attendance" 
      description={`Total Attendance: ${totalAttendance}`}
      allowDownload={true}
      allowDateRange={true}
      isLoading={isLoading}
      infoTooltip="Distribution of attendance across different class types"
    >
      <div className="h-64">
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </ReportCard>
  );
};

export default ClassAttendanceChart;
