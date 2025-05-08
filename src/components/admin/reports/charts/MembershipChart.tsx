
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ReportCard from "../ReportCard";

interface MembershipChartProps {
  fromDate?: Date;
  toDate?: Date;
  isLoading?: boolean;
}

// Sample membership data
const generateMembershipData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = months.map((name) => ({
    name,
    active: Math.floor(Math.random() * 60) + 100,
    new: Math.floor(Math.random() * 30) + 10,
    cancelled: Math.floor(Math.random() * 15) + 5,
  }));
  return data;
};

const MembershipChart = ({ fromDate, toDate, isLoading = false }: MembershipChartProps) => {
  const [data, setData] = useState(generateMembershipData());

  useEffect(() => {
    // In a real app, this would fetch data based on date range
    setData(generateMembershipData());
  }, [fromDate, toDate]);

  return (
    <ReportCard 
      title="Membership Trends" 
      description="Active, new, and cancelled memberships"
      allowDownload={true}
      allowDateRange={true}
      isLoading={isLoading}
      infoTooltip="Monthly membership changes showing active, new, and cancelled members"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} width={30} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: 12, paddingTop: 10}} />
            <Bar dataKey="active" name="Active" fill="#8b5cf6" />
            <Bar dataKey="new" name="New" fill="#10b981" />
            <Bar dataKey="cancelled" name="Cancelled" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ReportCard>
  );
};

export default MembershipChart;
