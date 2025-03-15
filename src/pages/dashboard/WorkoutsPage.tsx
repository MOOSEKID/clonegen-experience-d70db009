
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkoutsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Workouts</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Workout Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your personalized workout programs will appear here.</p>
          <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">No Workout Programs Yet</h3>
            <p className="text-gray-500 mb-4">Start your fitness journey by creating a new workout program.</p>
            <button className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded">
              Create New Program
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutsPage;
