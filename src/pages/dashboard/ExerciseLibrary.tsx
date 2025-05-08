
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import ExerciseCard from '@/components/workouts/ExerciseCard';
import ExerciseSearch from '@/components/workouts/ExerciseSearch';
import ExerciseTabs from '@/components/workouts/ExerciseTabs';
import EmptyExerciseState from '@/components/workouts/EmptyExerciseState';
import SuggestedExercises from '@/components/workouts/SuggestedExercises';
import { useExercises } from '@/hooks/useExercises';

const ExerciseLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { userProfile } = useUserProfile();
  const { plans } = useSubscriptionPlans();
  const { exercises } = useExercises();
  
  // Check if user has premium access
  const hasPremiumAccess = userProfile?.active_plan_id && 
    plans.some(plan => plan.planId === userProfile.active_plan_id && plan.priceValue > 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would filter exercises from DB
    console.log("Searching for:", searchQuery);
  };

  const handleClearFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
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
          <ExerciseSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
          />
        </CardContent>
      </Card>

      <ExerciseTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map(exercise => (
            <ExerciseCard 
              key={exercise.id}
              exercise={exercise}
              hasPremiumAccess={hasPremiumAccess}
            />
          ))}
        </div>
      </ExerciseTabs>

      {filteredExercises.length === 0 && (
        <EmptyExerciseState onClearFilters={handleClearFilters} />
      )}

      <SuggestedExercises hasPremiumAccess={hasPremiumAccess} />
    </div>
  );
};

export default ExerciseLibrary;
