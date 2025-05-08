
import React from 'react';
import { useWorkoutPrograms } from '@/hooks/useWorkoutPrograms';
import WorkoutProgramHeader from '@/components/dashboard/programs/WorkoutProgramHeader';
import WorkoutProgramFilters from '@/components/dashboard/programs/WorkoutProgramFilters';
import WorkoutProgramGrid from '@/components/dashboard/programs/WorkoutProgramGrid';
import WorkoutGenerateForm from '@/components/dashboard/programs/WorkoutGenerateForm';

const WorkoutPrograms = () => {
  const { 
    activeTab,
    setActiveTab,
    filteredPrograms,
    showGenerateForm,
    setShowGenerateForm,
    hasPremiumAccess,
    handleGenerateWorkout
  } = useWorkoutPrograms();

  return (
    <div className="space-y-6">
      <WorkoutProgramHeader 
        hasPremiumAccess={hasPremiumAccess}
        onShowGenerateForm={() => setShowGenerateForm(true)}
      />

      {showGenerateForm ? (
        <WorkoutGenerateForm 
          onSubmit={handleGenerateWorkout} 
          onCancel={() => setShowGenerateForm(false)}
        />
      ) : (
        <WorkoutProgramFilters 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          <WorkoutProgramGrid 
            programs={filteredPrograms}
            hasPremiumAccess={hasPremiumAccess}
          />
        </WorkoutProgramFilters>
      )}
    </div>
  );
};

export default WorkoutPrograms;
