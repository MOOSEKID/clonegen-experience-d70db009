
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HealthPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Health</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Health Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your health metrics and wellness data will be displayed here.</p>
          <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">No Health Data Yet</h3>
            <p className="text-gray-500 mb-4">Connect your fitness devices or enter health data manually to track your wellness journey.</p>
            <button className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded">
              Connect Devices
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthPage;
