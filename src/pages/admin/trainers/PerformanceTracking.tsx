
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTrainersData } from '@/hooks/useTrainersData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PerformanceStatsGrid from '@/components/admin/trainers/performance/PerformanceStatsGrid';
import PerformanceMetricsCard from '@/components/admin/trainers/performance/PerformanceMetricsCard';
import AttendanceTable, { ClassSession } from '@/components/admin/trainers/performance/AttendanceTable';

const PerformanceTracking = () => {
  const { trainers, isLoading } = useTrainersData();
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for trainer performance metrics
  const getMockSessionData = (): ClassSession[] => {
    const pastDays = [...Array(14)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    });
    
    return pastDays.slice(0, 8).map((date, index) => {
      // Generate some variation in the data
      const isCanceled = index === 2;
      const isNoShow = index === 5;
      
      let status: 'completed' | 'canceled' | 'no-show' = 'completed';
      if (isCanceled) status = 'canceled';
      if (isNoShow) status = 'no-show';
      
      return {
        id: `session-${index}`,
        date: date.toISOString(),
        class_name: ['HIIT Class', 'Yoga Flow', 'Strength Training', 'Spin Class'][index % 4],
        time: ['08:00', '10:30', '14:00', '17:30', '19:00'][index % 5],
        durationMinutes: [45, 60, 30, 50, 90][index % 5],
        attendees: Math.floor(Math.random() * 8) + 3,
        capacity: 12,
        status
      };
    });
  };
  
  // Get the selected trainer's name
  const getTrainerName = () => {
    if (!selectedTrainer) return '';
    const trainer = trainers.find(t => t.id === selectedTrainer);
    return trainer ? trainer.name : '';
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trainer Performance Tracking</h1>
      </div>
      
      <div className="mb-6">
        <Select
          value={selectedTrainer || ''}
          onValueChange={value => setSelectedTrainer(value)}
        >
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Select a trainer" />
          </SelectTrigger>
          <SelectContent>
            {trainers.map(trainer => (
              <SelectItem key={trainer.id} value={trainer.id}>
                {trainer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedTrainer ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <PerformanceStatsGrid trainerId={selectedTrainer} />
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                  <CardDescription>Latest classes conducted by {getTrainerName()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceTable 
                    trainerName={getTrainerName()}
                    sessions={getMockSessionData().slice(0, 4)} 
                    isLoading={false}
                  />
                </CardContent>
              </Card>
              
              <PerformanceMetricsCard 
                trainerId={selectedTrainer} 
                trainerName={getTrainerName()} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Attendance History</CardTitle>
                <CardDescription>Complete record of all classes for {getTrainerName()}</CardDescription>
              </CardHeader>
              <CardContent>
                <AttendanceTable 
                  trainerName={getTrainerName()}
                  sessions={getMockSessionData()} 
                  isLoading={false}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <PerformanceMetricsCard 
              trainerId={selectedTrainer} 
              trainerName={getTrainerName()} 
              fullView={true} 
            />
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-center text-muted-foreground">Please select a trainer to view performance data</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceTracking;
