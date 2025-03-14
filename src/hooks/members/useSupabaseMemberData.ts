
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';
import { supabase } from '@/integrations/supabase/client';

export const useSupabaseMemberData = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load members data from Supabase
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch members from Supabase
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('name');
          
        if (error) {
          throw error;
        }
        
        // Ensure data exists
        if (!data) {
          console.log('No member data returned from Supabase');
          setMembers([]);
          return;
        }
        
        // Map data fields to camelCase for frontend consistency
        const formattedMembers = data.map(memberData => {
          return {
            id: memberData.id || '',
            name: memberData.name || '',
            email: memberData.email || '',
            phone: memberData.phone || '',
            membershipType: memberData.membershiptype || '',
            startDate: memberData.startdate || '',
            endDate: memberData.enddate || '',
            status: memberData.status || 'Active',
            lastCheckin: memberData.lastcheckin || '',
            dateOfBirth: memberData.dateofbirth || '',
            gender: memberData.gender || '',
            address: memberData.address || '',
            emergencyContact: memberData.emergencycontact || '',
            membershipPlan: memberData.membershipplan || '',
            membershipCategory: memberData.membershipcategory || '',
            trainerAssigned: memberData.trainerassigned || '',
            workoutGoals: memberData.workoutgoals || '',
            medicalConditions: memberData.medicalconditions || '',
            preferredWorkoutTime: memberData.preferredworkouttime || [],
            paymentStatus: memberData.paymentstatus || '',
            discountsUsed: memberData.discountsused || '',
            notes: memberData.notes || '',
            profilePicture: memberData.profilepicture || '',
            nfcCardId: memberData.nfccardid || '',
            fingerprintId: memberData.fingerprintid || '',
            username: memberData.username || '',
            passwordResetRequired: memberData.passwordresetrequired ?? true,
            accountEnabled: memberData.accountenabled ?? true,
            lastLogin: memberData.lastlogin || '',
            linkedToCompany: memberData.linkedtocompany ?? false,
            linkedCompanyId: memberData.linkedcompanyid || ''
          } as Member;
        });
        
        setMembers(formattedMembers);
        console.log(`Loaded ${formattedMembers.length} members from Supabase`);
      } catch (error) {
        console.error('Error loading members:', error);
        setError(error instanceof Error ? error : new Error('Failed to load members'));
        toast.error('Failed to load members: ' + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
    
    // Subscribe to changes in members table for real-time updates
    const channel = supabase
      .channel('members-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'members' }, 
        (payload) => {
          console.log('Members table change detected:', payload);
          // Refresh data when changes occur
          loadMembers();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
        setIsSubscribed(status === 'SUBSCRIBED');
      });
    
    return () => {
      console.log('Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    members,
    isLoading,
    error,
    isSubscribed,
    setMembers
  };
};
