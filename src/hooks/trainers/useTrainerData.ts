
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile, StaffCertification } from './types';
import { getMockStaff } from './mockStaff';
import { adaptTrainerToStaff } from './adapters';

export const useTrainerData = () => {
  const [trainers, setTrainers] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      
      try {
        const { data: trainersData, error: trainersError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .order('name');
          
        if (trainersError) throw trainersError;
        
        if (trainersData) {
          const processedTrainers = trainersData.map((trainer: any): StaffProfile => {
            // Process certifications to match StaffCertification
            const certifications: StaffCertification[] = (trainer.certifications || [])
              .map((cert: any): StaffCertification => ({
                id: cert.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                staff_id: trainer.id,
                certification_name: cert.certification_name || '',
                issuing_organization: cert.issuing_organization || '',
                issue_date: cert.issue_date || null,
                expiry_date: cert.expiry_date || null,
                verified: cert.verified || false,
                certification_file: cert.certification_file || null,
                createdAt: cert.createdAt || null,
                updatedAt: cert.updatedAt || null
              }));
            
            // Return mapped staff profile using adapter
            const staffMember = adaptTrainerToStaff({
              ...trainer,
              certifications
            });
            
            // Ensure required fields
            if (!staffMember.id) {
              staffMember.id = trainer.id || 'temp-' + Math.random().toString(36).substring(2, 15);
            }
            if (!staffMember.full_name && trainer.name) {
              staffMember.full_name = trainer.name;
            }
            
            return staffMember as StaffProfile;
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
