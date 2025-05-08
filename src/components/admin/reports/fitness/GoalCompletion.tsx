
import { useState, useEffect } from 'react';
import ReportCard from '../ReportCard';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface GoalCompletionProps {
  fromDate?: Date;
  toDate?: Date;
}

// Generate goals summary data
const generateGoalsSummaryData = () => {
  return [
    { name: 'Completed', value: Math.floor(Math.random() * 150) + 200 },
    { name: 'In Progress', value: Math.floor(Math.random() * 200) + 350 },
    { name: 'Not Started', value: Math.floor(Math.random() * 100) + 100 },
    { name: 'Abandoned', value: Math.floor(Math.random() * 50) + 50 },
  ];
};

// Generate goals by type data
const generateGoalsByTypeData = () => {
  return [
    { type: 'Weight Loss', completed: 75, total: 120 },
    { type: 'Muscle Gain', completed: 45, total: 80 },
    { type: 'Endurance', completed: 60, total: 90 },
    { type: 'Flexibility', completed: 30, total: 50 },
    { type: 'General Fitness', completed: 85, total: 120 },
    { type: 'Specific Event', completed: 20, total: 25 },
  ];
};

// Generate monthly completion trends
const generateTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    name: month,
    completed: Math.floor(Math.random() * 30) + 20,
    newlySet: Math.floor(Math.random() * 40) + 30,
  }));
};

const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#f44336'];

const GoalCompletion = ({ fromDate, toDate }: GoalCompletionProps) => {
  const [goalsSummary, setGoalsSummary] = useState(generateGoalsSummaryData());
  const [goalsByType, setGoalsByType] = useState(generateGoalsByTypeData());
  const [trendData, setTrendData] = useState(generateTrendData());

  useEffect(() => {
    // In a real app, this would fetch data based on date range
    setGoalsSummary(generateGoalsSummaryData());
    setGoalsByType(generateGoalsByTypeData());
    setTrendData(generateTrendData());
  }, [fromDate, toDate]);

  const totalGoals = goalsSummary.reduce((sum, item) => sum + item.value, 0);
  const completedGoals = goalsSummary.find(item => item.name === 'Completed')?.value || 0;
  const completionRate = ((completedGoals / totalGoals) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Active Goals</div>
          <div className="text-2xl font-bold mt-1">{totalGoals.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-2">Across all members</div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Completed Goals</div>
          <div className="text-2xl font-bold mt-1">{completedGoals.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-2">Successfully achieved</div>
        </Card>
        
        <Card className="p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Completion Rate</div>
          <div className="text-2xl font-bold mt-1">{completionRate}%</div>
          <div className="text-sm text-gray-500 mt-2">Overall success rate</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportCard 
          title="Goals Status" 
          description="Distribution of goal completion statuses"
          allowDownload={true}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={goalsSummary}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {goalsSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} goals`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ReportCard>
        
        <ReportCard 
          title="Goals by Type" 
          description="Completion rate by goal category"
          allowDownload={true}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={goalsByType}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed" stackId="a" fill="#4caf50" />
                <Bar dataKey="total" name="Total Goals" stackId="b" fill="#bbdefb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ReportCard>
      </div>

      <ReportCard 
        title="Goal Completion Trends" 
        description="Monthly goal setting and completion"
        allowDownload={true}
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Goals Completed" fill="#4caf50" />
              <Bar dataKey="newlySet" name="New Goals Set" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ReportCard>
    </div>
  );
};

export default GoalCompletion;
