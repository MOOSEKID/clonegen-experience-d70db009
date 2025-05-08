
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, PenLine, NotebookPen, Sparkles } from 'lucide-react';

const NutritionTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Nutrition Tracking</h1>
      </div>

      <Card className="border-dashed border-2 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-gym-orange" />
            Coming Soon
          </CardTitle>
          <CardDescription>Our nutrition tracking system is currently under development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-6">
            <div className="text-center space-y-4">
              <div className="inline-flex h-20 w-20 rounded-full bg-gym-orange/20 items-center justify-center">
                <NotebookPen className="h-10 w-10 text-gym-orange" />
              </div>
              <h3 className="text-xl font-medium">Nutrition Tracking & Meal Planning</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Track your daily intake, create meal plans aligned with your fitness goals, and get AI-powered nutrition suggestions based on your workouts and progress.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100/50 justify-center flex-col space-y-2 p-6">
          <h4 className="font-medium">Features to look forward to:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI-powered meal planning based on your fitness goals</li>
            <li>Food image recognition for easy meal logging</li>
            <li>Macro and micronutrient tracking</li>
            <li>Water intake monitoring</li>
            <li>Integration with workout plans</li>
          </ul>
          <div className="pt-4">
            <Button variant="outline">
              <PenLine className="mr-2 h-4 w-4" /> Join Beta Waiting List
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Coming in Q3 2023</CardTitle>
              <Badge>Premium Feature</Badge>
            </div>
            <CardDescription>Meal Planning</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get AI-generated meal plans tailored to your fitness goals, dietary preferences, and nutritional needs.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Coming in Q4 2023</CardTitle>
              <Badge>Premium Feature</Badge>
            </div>
            <CardDescription>Nutrition Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Understand how your diet affects your performance with detailed nutrition insights and recommendations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionTracking;
