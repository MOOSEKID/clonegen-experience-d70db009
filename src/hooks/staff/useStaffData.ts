
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from '../trainers/types';
import { adaptTrainerToStaff } from '../trainers/adapters';

type StaffRole = 'trainer' | 'manager' | 'reception' | 'sales' | 'support';

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      
      try {
        // Fetch from trainers table
        const { data: trainersData, error: trainersError } = await supabase
          .from('trainers')
          .select('*')
          .order('name');
          
        if (trainersError) throw trainersError;
        
        if (trainersData && trainersData.length > 0) {
          // Map trainers to staff format
          const mappedTrainers = trainersData.map(trainer => {
            return adaptTrainerToStaff(trainer);
          });
          
          setStaff(mappedTrainers);
        } else {
          setStaff([]);
        }
      } catch (err) {
        console.error('Error fetching staff data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch staff'));
        setStaff([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStaff();
    
    // Set up real-time subscription for trainer updates
    const trainerSubscription = supabase
      .channel('public:trainers')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainers'
      }, () => {
        fetchStaff();
      })
      .subscribe();
      
    return () => {
      trainerSubscription.unsubscribe();
    };
  }, []);

  // Filter staff by role
  const getStaffByRole = (role: StaffRole | null = null) => {
    if (!role) return staff;
    return staff.filter(s => s.role === role);
  };

  return {
    staff,
    isLoading,
    error,
    getStaffByRole
  };
};
