
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Progress = () => {
  const weightData = [
    { name: 'Week 1', value: 185 },
    { name: 'Week 2', value: 183 },
    { name: 'Week 3', value: 182 },
    { name: 'Week 4', value: 180 },
    { name: 'Week 5', value: 179 },
    { name: 'Week 6', value: 177 },
  ];

  const strengthData = [
    { name: 'Bench Press', week1: 150, week6: 175 },
    { name: 'Squat', week1: 200, week6: 235 },
    { name: 'Deadlift', week1: 225, week6: 265 },
    { name: 'Shoulder Press', week1: 95, week6: 115 },
  ];

  const cardioData = [
    { name: 'Week 1', value: 22 },
    { name: 'Week 2', value: 24 },
    { name: 'Week 3', value: 26 },
    { name: 'Week 4', value: 25 },
    { name: 'Week 5', value: 28 },
    { name: 'Week 6', value: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={weightData} 
                index="name" 
                categories={["value"]}
                colors={["orange"]}
                valueFormatter={(value) => `${value} lbs`}
                className="h-72 mt-4" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cardio Fitness</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart 
                data={cardioData} 
                index="name" 
                categories={["value"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value} min`}
                className="h-72 mt-4" 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weight" className="mt-6">
          {/* Weight tab content */}
        </TabsContent>
        
        <TabsContent value="strength" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={strengthData} 
                index="name" 
                categories={["week1", "week6"]}
                colors={["gray", "orange"]}
                valueFormatter={(value) => `${value} lbs`}
                className="h-96 mt-4" 
              />
              <div className="flex justify-center mt-4 gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Week 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gym-orange rounded-full"></div>
                  <span>Week 6</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cardio" className="mt-6">
          {/* Cardio tab content */}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Latest Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Weight</div>
              <div className="text-xl font-bold">177 lbs</div>
              <div className="text-green-500 text-sm">-8 lbs</div>
            </div>
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Body Fat</div>
              <div className="text-xl font-bold">18.5%</div>
              <div className="text-green-500 text-sm">-2.3%</div>
            </div>
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">Muscle Mass</div>
              <div className="text-xl font-bold">142 lbs</div>
              <div className="text-green-500 text-sm">+3 lbs</div>
            </div>
            <div className="p-4 bg-gym-dark rounded-lg">
              <div className="text-gray-400 text-sm">BMI</div>
              <div className="text-xl font-bold">23.8</div>
              <div className="text-green-500 text-sm">-1.1</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
