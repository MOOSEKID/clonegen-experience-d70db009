
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart } from '@/components/ui/chart';

const Health = () => {
  const heartRateData = [
    { day: 'Mon', rate: 72 },
    { day: 'Tue', rate: 75 },
    { day: 'Wed', rate: 70 },
    { day: 'Thu', rate: 74 },
    { day: 'Fri', rate: 73 },
    { day: 'Sat', rate: 68 },
    { day: 'Sun', rate: 71 },
  ];

  const sleepData = [
    { day: 'Mon', hours: 6.5 },
    { day: 'Tue', hours: 7.2 },
    { day: 'Wed', hours: 6.8 },
    { day: 'Thu', hours: 7.5 },
    { day: 'Fri', hours: 8.0 },
    { day: 'Sat', hours: 8.5 },
    { day: 'Sun', hours: 7.8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Health Tracking</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resting Heart Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-gray-400">Healthy range</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2 hours</div>
            <p className="text-xs text-gray-400">Last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,453</div>
            <p className="text-xs text-gray-400">Goal: 10,000</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8 L</div>
            <p className="text-xs text-gray-400">Goal: 2.5 L</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Heart Rate (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart 
              data={heartRateData} 
              index="day" 
              categories={["rate"]}
              colors={["red"]}
              valueFormatter={(value) => `${value} bpm`}
              className="h-72" 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sleep Hours (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart 
              data={sleepData} 
              index="day" 
              categories={["hours"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value} hrs`}
              className="h-72" 
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nutrition Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Calories</div>
              <div className="text-xl font-bold">2,150</div>
              <div className="text-xs text-gray-400">Goal: 2,400</div>
            </div>
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Protein</div>
              <div className="text-xl font-bold">135g</div>
              <div className="text-xs text-gray-400">Goal: 150g</div>
            </div>
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Carbs</div>
              <div className="text-xl font-bold">210g</div>
              <div className="text-xs text-gray-400">Goal: 200g</div>
            </div>
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Fat</div>
              <div className="text-xl font-bold">65g</div>
              <div className="text-xs text-gray-400">Goal: 70g</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Health;
