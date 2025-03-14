
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Exercise } from './types';

export const useExerciseData = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load all exercises
  const loadExercises = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setExercises(data || []);
    } catch (error) {
      console.error('Error loading exercises:', error);
      setError(error instanceof Error ? error : new Error('Failed to load exercises'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    exercises,
    isLoading,
    error,
    loadExercises
  };
};
