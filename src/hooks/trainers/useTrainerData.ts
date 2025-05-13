
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile, StaffCertification } from './types';
import { getMockStaff } from './mockStaff';

export const useTrainerData = () => {
  const [trainers, setTrainers] = useState<StaffProfile[]>([]);
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
          const processedTrainers = trainersData.map((trainer: any): StaffProfile => {
            // Process certifications to match StaffCertification
            const certifications: StaffCertification[] = (trainer.certifications || [])
              .map((cert: any): StaffCertification => ({
                id: cert.id || '',
                staff_id: trainer.id,
                certification_name: cert.certification_name || '',
                issuing_organization: cert.issuing_organization || '',
                issue_date: cert.issue_date || null,
                expiry_date: cert.expiry_date || null,
                verified: cert.verified || false,
                certification_file: cert.certification_file || null,
                created_at: cert.created_at || null,
                updated_at: cert.updated_at || null
              }));
            
            // Return mapped staff profile
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
              hire_date: trainer.hiredate || null,
              experience_years: trainer.experience_years || 0,
              experience_level: trainer.experience_level || 'Beginner',
              certifications: certifications,
              availability: [], // Will be populated separately if needed
              hourly_rate: trainer.hourlyrate || null,
              stripe_account_id: null,
              created_at: trainer.created_at || null,
              updated_at: trainer.updated_at || null
            };
          });
          
          setTrainers(processedTrainers);
        } else {
          setTrainers(getMockStaff());
        }
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch trainers'));
        
        setTrainers(getMockStaff());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainers();
  }, []);

  return {
    trainers,
    isLoading,
    error
  };
};
