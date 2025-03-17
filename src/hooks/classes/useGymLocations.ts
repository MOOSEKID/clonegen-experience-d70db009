
import { useState, useEffect } from 'react';
import { getTable } from '@/integrations/supabase/client';

export interface GymLocation {
  id: string;
  name: string;
  type: 'room' | 'area';
  capacity: number;
  equipment: string[];
  created_at: string;
  updated_at: string;
}

export const useGymLocations = () => {
  const [locations, setLocations] = useState<GymLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await getTable('gym_locations')
          .select('*')
          .order('name');

        if (error) throw error;

        const typedLocations: GymLocation[] = (data || []).map((location: any) => ({
          id: location.id,
          name: location.name,
          type: location.type as 'room' | 'area',
          capacity: location.capacity || 0,
          equipment: location.equipment || [],
          created_at: location.created_at,
          updated_at: location.updated_at
        }));
        
        setLocations(typedLocations);
      } catch (err) {
        console.error('Error fetching gym locations:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch gym locations'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return {
    locations,
    isLoading,
    error,
    getRooms: () => locations.filter(l => l.type === 'room'),
    getAreas: () => locations.filter(l => l.type === 'area'),
    getById: (id: string) => locations.find(l => l.id === id)
  };
};
