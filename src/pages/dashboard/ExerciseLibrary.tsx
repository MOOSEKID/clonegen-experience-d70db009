
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { Search, Filter } from 'lucide-react';
import ExerciseCard from '@/components/workouts/ExerciseCard';
import PremiumFeatureGate from '@/components/workouts/PremiumFeatureGate';

// Sample exercise data structure
interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  imageUrl?: string;
  videoUrl?: string;
}

const ExerciseLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: '1',
      name: 'Barbell Bench Press',
      targetMuscle: 'Chest',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Bench+Press'
    },
    {
      id: '2',
      name: 'Pull-ups',
      targetMuscle: 'Back',
      equipment: 'Pull-up Bar',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Pull-ups'
    },
    {
      id: '3',
      name: 'Barbell Squat',
      targetMuscle: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Squat'
    },
    {
      id: '4',
      name: 'Dumbbell Shoulder Press',
      targetMuscle: 'Shoulders',
      equipment: 'Dumbbells',
      difficulty: 'Intermediate',
      isPremium: false,
      imageUrl: 'https://via.placeholder.com/300x200?text=Shoulder+Press'
    },
    {
      id: '5',
      name: 'Advanced Form: Front Squat',
      targetMuscle: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      isPremium: true,
      videoUrl: 'https://example.com/front-squat-video'
    },
    {
      id: '6',
      name: 'Advanced Form: Clean and Jerk',
      targetMuscle: 'Full Body',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      isPremium: true,
      videoUrl: 'https://example.com/clean-jerk-video'
    }
  ]);

  const { userProfile } = useUserProfile();
  const { plans } = useSubscriptionPlans();
  
  // Check if user has premium access
  const hasPremiumAccess = userProfile?.active_plan_id && 
    plans.some(plan => plan.planId === userProfile.active_plan_id && plan.priceValue > 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would filter exercises from DB
    console.log("Searching for:", searchQuery);
  };

  const filteredExercises = exercises.filter(exercise => {
    // Filter by tab
    if (activeTab !== 'all' && exercise.targetMuscle.toLowerCase() !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Exercise Library</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search exercises..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="chest">Chest</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
            <TabsTrigger value="legs">Legs</TabsTrigger>
            <TabsTrigger value="shoulders">Shoulders</TabsTrigger>
            <TabsTrigger value="arms">Arms</TabsTrigger>
            <TabsTrigger value="core">Core</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map(exercise => (
              <ExerciseCard 
                key={exercise.id}
                exercise={exercise}
                hasPremiumAccess={hasPremiumAccess}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredExercises.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No exercises found matching your criteria.</p>
        </div>
      )}

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
    </div>
  );
};

export default ExerciseLibrary;
