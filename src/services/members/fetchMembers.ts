
import { supabase } from '@/integrations/supabase/client';
import { MemberInfo } from '@/types/classTypes';
import { Member } from '@/types/memberTypes';

// Get members who are not enrolled or waitlisted in the class
export const getAvailableMembers = async (
  enrolledMembers: MemberInfo[], 
  waitlistMembers: MemberInfo[],
  searchTerm: string = ''
): Promise<MemberInfo[]> => {
  const enrolledIds = new Set(enrolledMembers.map(m => m.id));
  const waitlistIds = new Set(waitlistMembers.map(m => m.id));
  
  try {
    // Get members from Supabase
    let query = supabase
      .from('members')
      .select('id, name, email')
      .eq('status', 'Active');
    
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    
    if (!data) return [];
    
    // Convert Supabase members to MemberInfo format and filter out enrolled/waitlisted
    return data
      .filter(member => member && member.id) // Ensure member and member.id exist
      .map(member => ({
        id: member.id,
        name: member.name,
        email: member.email
      }))
      .filter(member => 
        !enrolledIds.has(member.id) && 
        !waitlistIds.has(member.id)
      );
  } catch (error) {
    console.error('Error in getAvailableMembers:', error);
    return [];
  }
};

// Fetch all members
export const fetchMembers = async (): Promise<Member[]> => {
  try {
    console.log('Fetching members from Supabase...');
    
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    
    // Ensure data is not null before mapping
    if (!data) {
      console.log('No member data returned from Supabase');
      return [];
    }
    
    console.log('Raw member data from Supabase:', data);
    
    // Convert database field names to camelCase for frontend
    const members = data
      .filter(memberData => memberData !== null)
      .map(memberData => {
        // Type assertion to safely access properties
        const memberRecord = memberData as Record<string, any>;
        
        return {
          id: memberRecord.id || '',
          name: memberRecord.name || '',
          email: memberRecord.email || '',
          phone: memberRecord.phone || '',
          membershipType: memberRecord.membershiptype || '',
          startDate: memberRecord.startdate || '',
          endDate: memberRecord.enddate || '',
          status: memberRecord.status || 'Active',
          lastCheckin: memberRecord.lastcheckin || '',
          dateOfBirth: memberRecord.dateofbirth || '',
          gender: memberRecord.gender || '',
          address: memberRecord.address || '',
          emergencyContact: memberRecord.emergencycontact || '',
          membershipPlan: memberRecord.membershipplan || '',
          membershipCategory: memberRecord.membershipcategory || '',
          trainerAssigned: memberRecord.trainerassigned || '',
          workoutGoals: memberRecord.workoutgoals || '',
          medicalConditions: memberRecord.medicalconditions || '',
          preferredWorkoutTime: memberRecord.preferredworkouttime || [],
          paymentStatus: memberRecord.paymentstatus || '',
          discountsUsed: memberRecord.discountsused || '',
          notes: memberRecord.notes || '',
          profilePicture: memberRecord.profilepicture || '',
          nfcCardId: memberRecord.nfccardid || '',
          fingerprintId: memberRecord.fingerprintid || '',
          username: memberRecord.username || '',
          passwordResetRequired: memberRecord.passwordresetrequired ?? true,
          accountEnabled: memberRecord.accountenabled ?? true,
          lastLogin: memberRecord.lastlogin || '',
          linkedToCompany: memberRecord.linkedtocompany ?? false,
          linkedCompanyId: memberRecord.linkedcompanyid || ''
        } as Member;
      });
    
    console.log(`Processed ${members.length} members with types applied`);
    
    return members;
  } catch (error) {
    console.error('Error in fetchMembers:', error);
    return [];
  }
};
