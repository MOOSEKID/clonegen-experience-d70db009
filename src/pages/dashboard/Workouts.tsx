
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Workouts = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Workouts</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upper Body Strength</CardTitle>
            <CardDescription>Focus on chest, shoulders, and arms</CardDescription>
          </CardHeader>
          <CardContent>
            <p>4 exercises · 45 minutes</p>
            <div className="mt-4 flex justify-end">
              <button className="text-gym-orange hover:underline">Start Workout</button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Lower Body Focus</CardTitle>
            <CardDescription>Build leg and core strength</CardDescription>
          </CardHeader>
          <CardContent>
            <p>5 exercises · 40 minutes</p>
            <div className="mt-4 flex justify-end">
              <button className="text-gym-orange hover:underline">Start Workout</button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>HIIT Cardio</CardTitle>
            <CardDescription>High-intensity interval training</CardDescription>
          </CardHeader>
          <CardContent>
            <p>8 exercises · 30 minutes</p>
            <div className="mt-4 flex justify-end">
              <button className="text-gym-orange hover:underline">Start Workout</button>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Recent Workouts</h2>
      <Card>
        <div className="divide-y divide-gray-700">
          {[
            { name: 'Full Body Workout', date: '2 days ago', duration: '52 min' },
            { name: 'Upper Body Strength', date: '5 days ago', duration: '45 min' },
            { name: 'HIIT Cardio', date: '1 week ago', duration: '32 min' },
          ].map((workout, i) => (
            <div key={i} className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{workout.name}</h3>
                <p className="text-sm text-gray-400">{workout.date}</p>
              </div>
              <div className="text-sm">{workout.duration}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Workouts;
