
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

const AchievementsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Achievements</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Fitness Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your fitness achievements and badges will be displayed here.</p>
          <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <Trophy className="h-16 w-16 text-gym-orange mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Achievements Yet</h3>
            <p className="text-gray-500 mb-4">Complete workouts and fitness challenges to earn achievements.</p>
            <button className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded">
              View Challenges
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsPage;
