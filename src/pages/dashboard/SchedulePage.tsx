
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SchedulePage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Schedule</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes & Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your scheduled classes and appointments will appear here.</p>
          <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">No Scheduled Activities</h3>
            <p className="text-gray-500 mb-4">Book classes or schedule appointments to see them here.</p>
            <button className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded">
              Browse Classes
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePage;
