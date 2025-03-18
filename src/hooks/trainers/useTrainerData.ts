
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TrainerProfile } from './types';
import { getMockTrainers } from './mockTrainers';

export const useTrainerData = () => {
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      
      try {
        const { data: trainersData, error: trainersError } = await supabase
          .from('trainers')
          .select('*')
          .order('name');
          
        if (trainersError) throw trainersError;
        
        if (trainersData) {
          const processedTrainers = await Promise.all(
            trainersData.map(async (trainer) => {
              const { data: certifications, error: certError } = await supabase
                .from('trainer_certifications')
                .select('*')
                .eq('trainer_id', trainer.id);
                
              if (certError) console.error('Error fetching certifications:', certError);
              
              const { data: availability, error: availError } = await supabase
                .from('trainer_availability')
                .select('*')
                .eq('trainer_id', trainer.id);
                
              if (availError) console.error('Error fetching availability:', availError);
              
              return {
                ...trainer,
                profilepicture: trainer.profilepicture || null,
                hiredate: trainer.hiredate || new Date().toISOString().split('T')[0],
                certifications: certifications || [],
                availability: availability || [],
                // Use type assertion to safely access potentially missing properties
                experience_years: (trainer as any).experience_years || 0,
                experience_level: (trainer as any).experience_level || 'Beginner'
              } as TrainerProfile;
            })
          );
          
          setTrainers(processedTrainers);
        } else {
          setTrainers(getMockTrainers());
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
        
        setTrainers(getMockTrainers());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainers();
    
    const subscription = supabase
      .channel('public:trainers')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainers'
      }, () => {
        fetchTrainers();
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
