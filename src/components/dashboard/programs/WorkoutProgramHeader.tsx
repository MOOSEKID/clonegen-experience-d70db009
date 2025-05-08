
import React from 'react';
import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PremiumFeatureGate from '@/components/workouts/PremiumFeatureGate';

interface WorkoutProgramHeaderProps {
  hasPremiumAccess: boolean;
  onShowGenerateForm: () => void;
}

const WorkoutProgramHeader: React.FC<WorkoutProgramHeaderProps> = ({ 
  hasPremiumAccess, 
  onShowGenerateForm 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Workout Programs</h1>
      <PremiumFeatureGate 
        hasPremium={hasPremiumAccess}
        featureName="AI Workout Generation"
        fallbackMessage="Upgrade to premium to create custom AI workouts"
      >
        <Button onClick={onShowGenerateForm}>
          <Dumbbell className="mr-2 h-4 w-4" /> Generate Custom Workout
        </Button>
      </PremiumFeatureGate>
    </div>
  );
};

export default WorkoutProgramHeader;
