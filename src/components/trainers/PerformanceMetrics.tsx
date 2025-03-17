
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTrainerPerformance } from '@/hooks/trainers/useTrainerPerformance';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PerformanceMetrics = () => {
  // We'll use a mock ID until we have a way to get the current trainer's ID
  const trainerId = "1";
  const { performanceMetrics, classAttendance, isLoading, error } = useTrainerPerformance(trainerId);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading performance data...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading performance data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-2">
              <CircularProgressbar 
                value={performanceMetrics.avg_session_rating * 20} // Convert 0-5 to 0-100
                text={`${performanceMetrics.avg_session_rating}/5`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: `rgba(62, 152, 199, ${performanceMetrics.avg_session_rating / 5})`,
                  textColor: '#333',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
            <h3 className="text-sm font-medium text-center">Average Rating</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-2">
              <CircularProgressbar 
                value={performanceMetrics.class_fill_rate} 
                text={`${Math.round(performanceMetrics.class_fill_rate)}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: `rgba(76, 175, 80, ${performanceMetrics.class_fill_rate / 100})`,
                  textColor: '#333',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
            <h3 className="text-sm font-medium text-center">Class Fill Rate</h3>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-2">
              <CircularProgressbar 
                value={performanceMetrics.client_retention_rate} 
                text={`${Math.round(performanceMetrics.client_retention_rate)}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: `rgba(255, 153, 0, ${performanceMetrics.client_retention_rate / 100})`,
                  textColor: '#333',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
            <h3 className="text-sm font-medium text-center">Client Retention</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm text-gray-500">Classes Taught</h3>
            <p className="text-xl font-semibold">{performanceMetrics.classes_taught}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm text-gray-500">Private Sessions</h3>
            <p className="text-xl font-semibold">{performanceMetrics.private_sessions}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm text-gray-500">New Clients</h3>
            <p className="text-xl font-semibold">{performanceMetrics.new_clients}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm text-gray-500">Total Hours</h3>
            <p className="text-xl font-semibold">{performanceMetrics.total_hours}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
