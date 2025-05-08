
import { useState } from 'react';
import ReportFilters from './filters/ReportFilters';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import GoalCompletion from './fitness/GoalCompletion';
import TrainerEffectiveness from './fitness/TrainerEffectiveness';
import MemberProgress from './fitness/MemberProgress';

// Available trainers
const trainers = [
  { id: 'trainer1', label: 'John Davis' },
  { id: 'trainer2', label: 'Sarah Wilson' },
  { id: 'trainer3', label: 'Robert Johnson' },
  { id: 'trainer4', label: 'Emily Thompson' },
];

const FitnessGoalsAnalytics = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('goals');

  const handleDateRangeChange = (from: Date | undefined, to: Date | undefined) => {
    setFromDate(from);
    setToDate(to);
    // Here you'd typically fetch new data based on the date range
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Fitness Goals & Progress Analytics</h2>
      
      <ReportFilters 
        onDateRangeChange={handleDateRangeChange}
        onExport={(format) => console.log(`Export as ${format}`)}
        onSchedule={() => console.log('Schedule reports')}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white border overflow-auto">
          <TabsTrigger value="goals" className="flex-1">Goal Completion</TabsTrigger>
          <TabsTrigger value="trainers" className="flex-1">Trainer Effectiveness</TabsTrigger>
          <TabsTrigger value="progress" className="flex-1">Member Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="mt-6">
          <GoalCompletion fromDate={fromDate} toDate={toDate} />
        </TabsContent>
        
        <TabsContent value="trainers" className="mt-6">
          <TrainerEffectiveness fromDate={fromDate} toDate={toDate} trainers={trainers} />
        </TabsContent>
        
        <TabsContent value="progress" className="mt-6">
          <MemberProgress fromDate={fromDate} toDate={toDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FitnessGoalsAnalytics;
