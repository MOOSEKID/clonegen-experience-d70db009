
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { GymLocation } from '@/types/classTypes';

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

        // Map and validate the type field to ensure it's compatible with our GymLocation type
        const typedLocations: GymLocation[] = data?.map(item => ({
          id: item.id,
          name: item.name,
          // Ensure type is either 'room' or 'area'
          type: (item.type === 'room' || item.type === 'area') ? item.type : 'room',
          capacity: item.capacity || 0,
          equipment: item.equipment || []
        })) || [];

        setLocations(typedLocations);
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
