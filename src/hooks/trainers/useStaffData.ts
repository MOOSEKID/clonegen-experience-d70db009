
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile } from './types';
import { getMockStaff } from './mockStaff';

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      
      try {
        const { data: staffData, error: staffError } = await supabase
          .from('staff')
          .select('*')
          .order('name');
          
        if (staffError) throw staffError;
        
        if (staffData) {
          const processedStaff = await Promise.all(
            staffData.map(async (staffMember) => {
              const { data: certifications, error: certError } = await supabase
                .from('staff_certifications')
                .select('*')
                .eq('staff_id', staffMember.id);
                
              if (certError) console.error('Error fetching certifications:', certError);
              
              const { data: availability, error: availError } = await supabase
                .from('staff_availability')
                .select('*')
                .eq('staff_id', staffMember.id);
                
              if (availError) console.error('Error fetching availability:', availError);
              
              return {
                ...staffMember,
                profile_picture: staffMember.profile_picture || null,
                hire_date: staffMember.hire_date || new Date().toISOString().split('T')[0],
                certifications: certifications || [],
                availability: availability || [],
                experience_years: staffMember.experience_years || 0,
                experience_level: staffMember.experience_level || 'Beginner'
              } as StaffProfile;
            })
          );
          
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
      .channel('public:staff')
      .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'staff'
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
