
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Dumbbell, Library, LineChart, Apple } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';

const Workouts = () => {
  const { userProfile } = useUserProfile();
  const { plans } = useSubscriptionPlans();
  
  // Check if user has premium access
  const hasPremiumAccess = userProfile?.active_plan_id && 
    plans.some(plan => plan.planId === userProfile.active_plan_id && plan.priceValue > 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Workouts</h1>
        <Button asChild>
          <Link to="/dashboard/workout-programs">
            <Plus className="mr-2 h-4 w-4" /> Create Workout
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Upper Body Strength</CardTitle>
            <CardDescription>Focus on chest, shoulders, and arms</CardDescription>
          </CardHeader>
          <CardContent>
            <p>4 exercises · 45 minutes</p>
            <div className="mt-4 flex justify-end">
              <Button className="text-gym-orange hover:underline">Start Workout</Button>
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
              <Button className="text-gym-orange hover:underline">Start Workout</Button>
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
              <Button className="text-gym-orange hover:underline">Start Workout</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/workout-programs">
          <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="bg-gym-orange/10 p-3 rounded-lg w-fit mb-2">
                <Dumbbell className="h-6 w-6 text-gym-orange" />
              </div>
              <CardTitle>Workout Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Browse and follow professionally designed workout programs or create your own
                {hasPremiumAccess && " with AI assistance"}
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/exercise-library">
          <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
                <Library className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Exercise Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Explore our comprehensive database of exercises with instructions and videos
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/progress">
          <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
                <LineChart className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Log your workouts and visualize your progress over time
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/dashboard/nutrition">
          <Card className="h-full hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="bg-yellow-100 p-3 rounded-lg w-fit mb-2">
                <Apple className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Nutrition <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded ml-1">Coming Soon</span></CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Track your nutrition and get personalized meal recommendations
              </p>
            </CardContent>
          </Card>
        </Link>
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
