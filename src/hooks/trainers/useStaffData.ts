
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
        // For now, use the trainers table as a fallback since staff table might not exist yet
        const { data: staffData, error: staffError } = await supabase
          .from('trainers')
          .select('*')
          .order('name');
          
        if (staffError) throw staffError;
        
        if (staffData) {
          const processedStaff = staffData.map((trainer: any) => {
            return {
              id: trainer.id,
              name: trainer.name,
              email: trainer.email || '',
              phone: trainer.phone || null,
              bio: trainer.bio || null,
              profile_picture: trainer.profilepicture || null,
              role: 'trainer',
              specialization: trainer.specialization || [],
              status: trainer.status || 'Active',
              hire_date: trainer.hiredate || new Date().toISOString().split('T')[0],
              experience_years: 0,
              experience_level: 'Beginner'
            } as StaffProfile;
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
