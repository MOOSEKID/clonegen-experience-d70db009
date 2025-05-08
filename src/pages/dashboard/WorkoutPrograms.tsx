
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Dumbbell, Clock, Filter } from 'lucide-react';
import WorkoutProgramCard from '@/components/workouts/WorkoutProgramCard';
import GenerateWorkoutForm from '@/components/workouts/GenerateWorkoutForm';
import PremiumFeatureGate from '@/components/workouts/PremiumFeatureGate';

interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  isPremium: boolean;
  imageUrl?: string;
}

const WorkoutPrograms = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([]);
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const { toast } = useToast();
  const { userProfile } = useUserProfile();
  const { plans } = useSubscriptionPlans();
  
  // Check if user has premium access
  const hasPremiumAccess = userProfile?.active_plan_id && 
    plans.some(plan => plan.planId === userProfile.active_plan_id && plan.priceValue > 0);

  useEffect(() => {
    // In a real app, we'd fetch this from Supabase
    // For now, using mock data
    setWorkoutPrograms([
      {
        id: '1',
        name: 'Full Body Strength',
        description: 'Build overall strength with compound movements',
        level: 'Intermediate',
        duration: '45 minutes',
        category: 'Strength',
        isPremium: false,
      },
      {
        id: '2',
        name: 'HIIT Cardio Burn',
        description: 'High intensity interval training for maximum calorie burn',
        level: 'Advanced',
        duration: '30 minutes',
        category: 'Cardio',
        isPremium: false,
      },
      {
        id: '3',
        name: 'Beginner Weight Loss',
        description: 'Perfect for those just starting their fitness journey',
        level: 'Beginner',
        duration: '40 minutes',
        category: 'Weight Loss',
        isPremium: false,
      },
      {
        id: '4',
        name: 'Custom AI Strength Plan',
        description: 'Personalized strength program based on your goals',
        level: 'Intermediate',
        duration: 'Varies',
        category: 'AI Generated',
        isPremium: true,
      },
      {
        id: '5',
        name: 'Custom AI Cardio Plan',
        description: 'AI-generated cardio program optimized for your fitness level',
        level: 'Intermediate',
        duration: 'Varies',
        category: 'AI Generated',
        isPremium: true,
      }
    ]);
  }, []);

  const filteredPrograms = workoutPrograms.filter(program => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ai' && program.category === 'AI Generated') return true;
    if (activeTab === 'strength' && program.category === 'Strength') return true;
    if (activeTab === 'cardio' && program.category === 'Cardio') return true;
    if (activeTab === 'weight-loss' && program.category === 'Weight Loss') return true;
    return false;
  });

  const handleGenerateWorkout = (formData: any) => {
    toast({
      title: "Generating your workout program",
      description: "Your personalized workout is being created based on your preferences.",
    });
    
    // In a real application, we would call our AI service here
    setTimeout(() => {
      toast({
        title: "Workout Program Generated!",
        description: "Your new workout program is ready to view.",
      });
      setShowGenerateForm(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Workout Programs</h1>
        <PremiumFeatureGate 
          hasPremium={hasPremiumAccess}
          featureName="AI Workout Generation"
          fallbackMessage="Upgrade to premium to create custom AI workouts"
        >
          <Button onClick={() => setShowGenerateForm(true)}>
            <Dumbbell className="mr-2 h-4 w-4" /> Generate Custom Workout
          </Button>
        </PremiumFeatureGate>
      </div>

      {showGenerateForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate Custom Workout</CardTitle>
            <CardDescription>Provide your preferences to create a personalized workout plan</CardDescription>
          </CardHeader>
          <CardContent>
            <GenerateWorkoutForm onSubmit={handleGenerateWorkout} onCancel={() => setShowGenerateForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Programs</TabsTrigger>
                <TabsTrigger value="strength">Strength</TabsTrigger>
                <TabsTrigger value="cardio">Cardio</TabsTrigger>
                <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
                <TabsTrigger value="ai">AI Generated</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.map(program => (
                  <WorkoutProgramCard 
                    key={program.id}
                    program={program}
                    hasPremiumAccess={hasPremiumAccess}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default WorkoutPrograms;
