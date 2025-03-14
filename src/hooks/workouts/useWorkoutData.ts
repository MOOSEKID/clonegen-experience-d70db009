
import { useProgramData } from './useProgramData';
import { useExerciseData } from './useExerciseData';

export const useWorkoutData = () => {
  const { 
    workoutPrograms, 
    isLoading: programsLoading, 
    error: programsError, 
    loadWorkoutPrograms 
  } = useProgramData();
  
  const { 
    exercises, 
    isLoading: exercisesLoading, 
    error: exercisesError, 
    loadExercises 
  } = useExerciseData();

  // Combine loading and error states
  const isLoading = programsLoading || exercisesLoading;
  const error = programsError || exercisesError;

  return {
    workoutPrograms,
    exercises,
    isLoading,
    error,
    loadWorkoutPrograms,
    loadExercises
  };
};
