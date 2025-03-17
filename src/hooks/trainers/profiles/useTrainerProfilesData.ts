
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrainerProfile } from './types';
import { fetchTrainers } from './trainerService';

export const useTrainerProfilesData = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const loadTrainers = async () => {
      setIsLoading(true);
      
      try {
        const trainersData = await fetchTrainers();
        setTrainers(trainersData);
      } catch (err) {
        console.error('Error in useTrainerProfilesData:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTrainers();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('public:trainers')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainers'
      }, () => {
        loadTrainers();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    trainers,
    isLoading,
    error
  };
};
