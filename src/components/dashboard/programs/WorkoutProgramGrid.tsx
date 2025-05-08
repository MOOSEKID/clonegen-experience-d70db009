
import React from 'react';
import { WorkoutProgram } from '@/hooks/useWorkoutPrograms';
import WorkoutProgramCard from '@/components/workouts/WorkoutProgramCard';

interface WorkoutProgramGridProps {
  programs: WorkoutProgram[];
  hasPremiumAccess: boolean;
}

const WorkoutProgramGrid: React.FC<WorkoutProgramGridProps> = ({ 
  programs, 
  hasPremiumAccess 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {programs.map(program => (
        <WorkoutProgramCard 
          key={program.id}
          program={program}
          hasPremiumAccess={hasPremiumAccess}
        />
      ))}
    </div>
  );
};

export default WorkoutProgramGrid;
