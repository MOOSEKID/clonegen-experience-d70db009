
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from './types';
import { getMockStaff } from './mockStaff';
import { adaptTrainerToStaff } from './adapters';

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      
      try {
        // For now, use the trainer_profiles table
        const { data: staffData, error: staffError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .order('name');
          
        if (staffError) throw staffError;
        
        if (staffData) {
          const processedStaff = staffData.map((trainer: any) => {
            // Ensure all required fields are present
            const staffMember = adaptTrainerToStaff(trainer);
            
            // Ensure the required fields are present
            if (!staffMember.id) {
              staffMember.id = trainer.id || 'temp-' + Math.random().toString(36).substring(2, 15);
            }
            if (!staffMember.full_name && trainer.name) {
              staffMember.full_name = trainer.name;
            }
            
            return staffMember as StaffProfile;
          });
          
          setStaff(processedStaff);
        } else {
          setStaff(getMockStaff());
        }
      } catch (err) {
        console.error('Error fetching staff:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch staff'));
        
        setStaff(getMockStaff());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStaff();
    
    const subscription = supabase
      .channel('public:trainer_profiles')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'trainer_profiles'
      }, () => {
        fetchStaff();
      })
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    staff,
    isLoading,
    error
  };
};

// For backward compatibility with existing code that uses trainers
export const useTrainerData = useStaffData;
