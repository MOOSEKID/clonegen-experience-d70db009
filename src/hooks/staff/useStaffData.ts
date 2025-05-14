import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from '../trainers/types';
import { adaptTrainerToStaff, adaptStaffMemberToStaffProfile } from '../trainers/adapters';
import { toast } from '@/components/ui/use-toast';

type StaffRole = 'trainer' | 'manager' | 'reception' | 'sales' | 'support';

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      
      try {
        // Primary approach: Try fetching from staff table
        const { data: staffData, error: staffError } = await supabase
          .from('staff')
          .select('*')
          .order('full_name');
          
        if (staffError) {
          console.error('Error fetching from staff table:', staffError);
          throw new Error(`Failed to fetch from staff table: ${staffError.message}`);
        }
        
        if (staffData && staffData.length > 0) {
          // Map staff data to the expected format
          const mappedStaff = staffData.map(staffMember => {
            return adaptStaffMemberToStaffProfile(staffMember);
          });
          
          setStaff(mappedStaff);
          console.log('Staff loaded from staff table:', mappedStaff.length);
        } else {
          // Fallback: If no staff data, try fetching from trainer_profiles table
          console.log('No staff found in staff table, trying trainer_profiles table');
          const { data: trainersData, error: trainersError } = await supabase
            .from('trainer_profiles')
            .select('*')
            .order('name');
            
          if (trainersError) {
            console.error('Error fetching from trainer_profiles table:', trainersError);
            throw new Error(`Failed to fetch from trainer_profiles table: ${trainersError.message}`);
          }
          
          if (trainersData && trainersData.length > 0) {
            // Map trainers to staff format
            const mappedTrainers = trainersData.map(trainer => {
              return adaptTrainerToStaff(trainer);
            });
            
            setStaff(mappedTrainers);
            console.log('Staff loaded from trainer_profiles table:', mappedTrainers.length);
          } else {
            setStaff([]);
            console.log('No staff found in either table');
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Unknown error fetching staff data';
        
        console.error('Error fetching staff data:', err);
        setError(err instanceof Error ? err : new Error(errorMessage));
        
        // Show toast notification for the error
        toast({
          variant: "destructive",
          title: "Failed to load staff data",
          description: errorMessage,
        });
        
        // Set empty staff array to prevent UI errors
        setStaff([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStaff();
    
    // Set up real-time subscription for staff updates
    const staffSubscription = supabase
      .channel('public:staff')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'staff'
      }, () => {
        fetchStaff();
      })
      .subscribe();
      
    // Also keep subscription to trainer_profiles table for backward compatibility
    const trainerSubscription = supabase
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
      staffSubscription.unsubscribe();
      trainerSubscription.unsubscribe();
    };
  }, []);

  // Filter staff by role with better error handling
  const getStaffByRole = (role: StaffRole | null = null) => {
    if (!role) return staff;
    return staff.filter(s => {
      // Handle both string and array formats for roles
      if (Array.isArray(s.roles)) {
        return s.roles.includes(role);
      }
      return s.role === role;
    });
  };

  return {
    staff,
    isLoading,
    error,
    getStaffByRole
  };
};
