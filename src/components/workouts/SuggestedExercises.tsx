
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PremiumFeatureGate from '@/components/workouts/PremiumFeatureGate';

interface SuggestedExercisesProps {
  hasPremiumAccess: boolean;
}

const SuggestedExercises = ({ hasPremiumAccess }: SuggestedExercisesProps) => {
  return (
    <Card className="bg-gray-50 border-dashed">
      <CardHeader>
        <CardTitle>Suggested Exercises</CardTitle>
        <CardDescription>Based on your recent workouts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <PremiumFeatureGate
            hasPremium={hasPremiumAccess}
            featureName="Personalized Exercise Suggestions"
            fallbackMessage="Upgrade for personalized suggestions"
          >
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Try Something New</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Based on your progress, we recommend trying these new exercises to challenge yourself.</p>
                <Button variant="link" className="px-0 py-1">View Recommendations</Button>
              </CardContent>
            </Card>
          </PremiumFeatureGate>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedExercises;
