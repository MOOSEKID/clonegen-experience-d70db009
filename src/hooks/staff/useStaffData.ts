
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StaffProfile, StaffCertification, StaffAvailability } from '../trainers/types';

type StaffRole = 'trainer' | 'manager' | 'reception' | 'sales' | 'support';

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      
      try {
        // Fetch all staff members
        const { data: staffData, error: staffError } = await supabase
          .from('staff')
          .select('*')
          .order('full_name');
          
        if (staffError) throw staffError;
        
        if (staffData && staffData.length > 0) {
          // Fetch certifications for all staff
          const { data: certsData, error: certsError } = await supabase
            .from('staff_certifications')
            .select('*')
            .in('staff_id', staffData.map(s => s.id));
            
          if (certsError) throw certsError;
          
          // Fetch availability for all staff
          const { data: availData, error: availError } = await supabase
            .from('staff_availability')
            .select('*')
            .in('staff_id', staffData.map(s => s.id));
            
          if (availError) throw availError;
            
          // Process and map the data
          const processedStaff = staffData.map((staffMember): StaffProfile => {
            // Map certifications to this staff member
            const certifications = certsData 
              ? certsData
                  .filter(cert => cert.staff_id === staffMember.id)
                  .map((cert): StaffCertification => ({
                    id: cert.id,
                    staff_id: cert.staff_id,
                    certification_name: cert.certification_name,
                    issuing_organization: cert.issuing_organization || '',
                    issue_date: cert.issue_date || null,
                    expiry_date: cert.expiry_date || null,
                    verified: cert.verified || false,
                    certification_file: cert.certification_file || null,
                    created_at: cert.created_at || null,
                    updated_at: cert.updated_at || null
                  }))
              : [];
              
            // Map availability to this staff member
            const availability = availData
              ? availData
                  .filter(avail => avail.staff_id === staffMember.id)
                  .map((avail): StaffAvailability => ({
                    id: avail.id,
                    staff_id: avail.staff_id,
                    day_of_week: avail.day_of_week || '',
                    start_time: avail.start_time || '',
                    end_time: avail.end_time || '',
                    created_at: avail.created_at || null,
                    updated_at: avail.updated_at || null
                  }))
              : [];
            
            // Cast the role to one of the valid role types
            const role = validateStaffRole(staffMember.role);
            
            // Return completed staff profile
            return {
              id: staffMember.id,
              full_name: staffMember.full_name,
              email: staffMember.email || '',
              phone: staffMember.phone || '',
              role,
              photo_url: staffMember.photo_url || null,
              access_level: staffMember.access_level || 'staff',
              status: staffMember.status || 'Active',
              specialties: staffMember.specialties || [],
              bio: staffMember.bio || null,
              hire_date: staffMember.hire_date || null,
              assigned_classes: staffMember.assigned_classes || [],
              assigned_members: staffMember.assigned_members || [],
              certifications,
              availability,
              created_at: staffMember.created_at || null,
              updated_at: staffMember.updated_at || null
            };
          });
          
          setStaff(processedStaff);
        } else {
          setStaff([]);
        }
      } catch (err) {
        console.error('Error fetching staff:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch staff'));
        setStaff([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStaff();
    
    // Set up real-time subscriptions for staff changes
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
      
    return () => {
      staffSubscription.unsubscribe();
    };
  }, []);

  // Function to filter staff by role
  const getStaffByRole = (role: 'trainer' | 'manager' | 'reception' | 'sales' | 'support' | null = null) => {
    if (!role) return staff;
    return staff.filter(s => s.role === role);
  };

  // Function to validate and normalize staff role
  const validateStaffRole = (role: string): StaffRole => {
    const validRoles: StaffRole[] = ['trainer', 'manager', 'reception', 'sales', 'support'];
    
    // Convert to lowercase for case-insensitive comparison
    const normalizedRole = role.toLowerCase();
    
    if (validRoles.includes(normalizedRole as StaffRole)) {
      return normalizedRole as StaffRole;
    }
    
    return 'support'; // Default fallback role
  };

  return {
    staff,
    isLoading,
    error,
    getStaffByRole
  };
};
