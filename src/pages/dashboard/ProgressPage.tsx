
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Progress</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Fitness Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your fitness progress metrics will be displayed here.</p>
          <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">No Progress Data Yet</h3>
            <p className="text-gray-500 mb-4">Start tracking your fitness journey to see progress over time.</p>
            <button className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded">
              Begin Tracking
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
