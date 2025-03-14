
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrainersData } from '@/hooks/useTrainersData';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';
import PerformanceStatsGrid from '@/components/admin/trainers/performance/PerformanceStatsGrid';
import PerformanceMetricsCard from '@/components/admin/trainers/performance/PerformanceMetricsCard';
import AttendanceTable from '@/components/admin/trainers/performance/AttendanceTable';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PerformanceTracking = () => {
  const { trainers, isLoading: isLoadingTrainers } = useTrainersData();
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | undefined>(undefined);
  const { performanceMetrics, classAttendance, isLoading: isLoadingPerformance } = useTrainerPerformance(selectedTrainerId);

  const selectedTrainer = trainers.find(trainer => trainer.id === selectedTrainerId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Performance Tracking</h1>
        <p className="text-gray-500">Track trainer performance, class attendance, and client feedback</p>
      </div>

      <div className="w-full md:w-80">
        <Select
          value={selectedTrainerId}
          onValueChange={(value) => setSelectedTrainerId(value)}
          disabled={isLoadingTrainers}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a trainer" />
          </SelectTrigger>
          <SelectContent>
            {trainers.map((trainer) => (
              <SelectItem key={trainer.id} value={trainer.id}>
                {trainer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!selectedTrainerId ? (
        <Card>
          <CardContent className="flex items-center justify-center p-12">
            <div className="text-center text-gray-500">
              <p>Please select a trainer to view their performance data.</p>
            </div>
          </CardContent>
        </Card>
      ) : isLoadingTrainers || isLoadingPerformance ? (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">
              {selectedTrainer?.name}'s Performance Overview
            </h2>
            <PerformanceStatsGrid 
              data={performanceMetrics} 
              isLoading={isLoadingPerformance} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceMetricsCard 
              data={performanceMetrics} 
              isLoading={isLoadingPerformance} 
            />
            <AttendanceTable 
              data={classAttendance} 
              isLoading={isLoadingPerformance} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTracking;
