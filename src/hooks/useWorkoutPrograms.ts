
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';

export interface WorkoutProgram {
  id: string;
  name: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: string;
  category: string;
  isPremium: boolean;
  imageUrl?: string;
}

export function useWorkoutPrograms() {
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
        durationMinutes: '45 minutes',
        category: 'Strength',
        isPremium: false,
      },
      {
        id: '2',
        name: 'HIIT Cardio Burn',
        description: 'High intensity interval training for maximum calorie burn',
        level: 'Advanced',
        durationMinutes: '30 minutes',
        category: 'Cardio',
        isPremium: false,
      },
      {
        id: '3',
        name: 'Beginner Weight Loss',
        description: 'Perfect for those just starting their fitness journey',
        level: 'Beginner',
        durationMinutes: '40 minutes',
        category: 'Weight Loss',
        isPremium: false,
      },
      {
        id: '4',
        name: 'Custom AI Strength Plan',
        description: 'Personalized strength program based on your goals',
        level: 'Intermediate',
        durationMinutes: 'Varies',
        category: 'AI Generated',
        isPremium: true,
      },
      {
        id: '5',
        name: 'Custom AI Cardio Plan',
        description: 'AI-generated cardio program optimized for your fitness level',
        level: 'Intermediate',
        durationMinutes: 'Varies',
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

  return {
    activeTab,
    setActiveTab,
    filteredPrograms,
    showGenerateForm,
    setShowGenerateForm,
    hasPremiumAccess,
    handleGenerateWorkout
  };
}
