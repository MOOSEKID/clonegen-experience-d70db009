
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GymLocation {
  id: string;
  name: string;
  type: 'room' | 'area';
  capacity: number;
  equipment: string[];
}

export const useGymLocations = () => {
  const [locations, setLocations] = useState<GymLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('gym_locations')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setLocations(data || []);
      } catch (error) {
        console.error('Error fetching gym locations:', error);
        toast.error('Failed to load gym locations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, isLoading };
};
