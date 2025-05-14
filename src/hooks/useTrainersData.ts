
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getTrainers as getMockTrainers } from '@/data/trainersData';

export interface Trainer {
  id: string;
  name: string;
  specialization: string[] | null;
  email: string;
  phone?: string | null;
  status?: string | null;
}

export const useTrainersData = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('trainer_profiles')
          .select('id, name, specialization, email, phone, status')
          .eq('status', 'Active');
        
        if (error) throw error;
        
        if (data) {
          setTrainers(data as Trainer[]);
        } else {
          // Fallback to mock data if no data is returned
          setTrainers(getMockTrainers().map(trainer => ({
            id: trainer.id.toString(),
            name: trainer.name,
            specialization: [trainer.specialization],
            email: `${trainer.name.toLowerCase().replace(' ', '.')}@uptowngym.com`
          })));
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
        
        // Fallback to mock data on error
        setTrainers(getMockTrainers().map(trainer => ({
          id: trainer.id.toString(),
          name: trainer.name,
          specialization: [trainer.specialization],
          email: `${trainer.name.toLowerCase().replace(' ', '.')}@uptowngym.com`
        })));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return { trainers, isLoading, error };
};
