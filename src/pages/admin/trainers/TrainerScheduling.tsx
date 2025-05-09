
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, UserCheck } from 'lucide-react';
import { useTrainersData } from '@/hooks/useTrainersData';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const TrainerScheduling = () => {
  const { trainers, isLoading } = useTrainersData();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trainer Scheduling</h1>
        <p className="text-gray-500">Manage trainer availability and class assignments</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gym-orange" />
            <span>Scheduling Dashboard</span>
          </CardTitle>
          <CardDescription>
            Manage all aspects of your trainers' schedules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Available Trainers</h3>
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{trainers.length}</p>
              <p className="text-sm text-gray-500">Active trainers</p>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Classes This Week</h3>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-gray-500">Assigned classes</p>
            </div>
            
            <div className="border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Pending Requests</h3>
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-500">Time-off requests</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="border border-gray-200 p-3 rounded-lg text-left hover:bg-gray-50">
                <p className="font-medium">Assign Trainer to Class</p>
                <p className="text-sm text-gray-500">Select a trainer and class</p>
              </button>
              <button className="border border-gray-200 p-3 rounded-lg text-left hover:bg-gray-50">
                <p className="font-medium">Update Availability</p>
                <p className="text-sm text-gray-500">Set working hours</p>
              </button>
              <button className="border border-gray-200 p-3 rounded-lg text-left hover:bg-gray-50">
                <p className="font-medium">Process Time Off</p>
                <p className="text-sm text-gray-500">Handle time off requests</p>
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 text-center">
            This is a placeholder for the Trainer Scheduling functionality. 
            More detailed features will be implemented in the future.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerScheduling;
