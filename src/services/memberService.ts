
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

// Add new member service functions
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

export const addMember = async (memberData: Partial<Member>): Promise<Member | null> => {
  try {
    console.log('Adding new member with data:', memberData);
    
    // Convert camelCase to database field names (lowercase)
    const dbMemberData = {
      name: memberData.name,
      email: memberData.email,
      phone: memberData.phone,
      membershiptype: memberData.membershipType,
      startdate: memberData.startDate,
      enddate: memberData.endDate,
      status: memberData.status,
      dateofbirth: memberData.dateOfBirth,
      gender: memberData.gender,
      address: memberData.address,
      emergencycontact: memberData.emergencyContact,
      membershipplan: memberData.membershipPlan,
      membershipcategory: memberData.membershipCategory,
      trainerassigned: memberData.trainerAssigned,
      workoutgoals: memberData.workoutGoals,
      medicalconditions: memberData.medicalConditions,
      preferredworkouttime: memberData.preferredWorkoutTime,
      paymentstatus: memberData.paymentStatus,
      discountsused: memberData.discountsUsed,
      notes: memberData.notes,
      profilepicture: memberData.profilePicture,
      nfccardid: memberData.nfcCardId,
      fingerprintid: memberData.fingerprintId,
      username: memberData.username,
      passwordresetrequired: memberData.passwordResetRequired,
      accountenabled: memberData.accountEnabled,
      lastlogin: memberData.lastLogin,
      linkedtocompany: memberData.linkedToCompany,
      linkedcompanyid: memberData.linkedCompanyId
    };
    
    const { data, error } = await supabase
      .from('members')
      .insert([dbMemberData])
      .select();
      
    if (error) {
      console.error('Error adding member:', error);
      return null;
    }
    
    console.log('Response after adding member:', data);
    
    // Convert back to camelCase for frontend
    if (!data || data.length === 0) {
      console.log('No data returned after adding member');
      return null;
    }

    const memberResult = data[0] as Record<string, any>;
    if (!memberResult) {
      console.log('Member result is null after adding');
      return null;
    }
    
    return {
      id: memberResult.id || '',
      name: memberResult.name || '',
      email: memberResult.email || '',
      phone: memberResult.phone || '',
      membershipType: memberResult.membershiptype || '',
      startDate: memberResult.startdate || '',
      endDate: memberResult.enddate || '',
      status: memberResult.status || 'Active',
      lastCheckin: memberResult.lastcheckin || '',
    } as Member;
  } catch (error) {
    console.error('Error in addMember:', error);
    return null;
  }
};

export const updateMember = async (id: string, memberData: Partial<Member>): Promise<Member | null> => {
  try {
    console.log(`Updating member with ID ${id}, data:`, memberData);
    
    // Convert camelCase to database field names (lowercase)
    const dbMemberData: Record<string, any> = {};
    
    // Map only the fields that are being updated
    if (memberData.name) dbMemberData['name'] = memberData.name;
    if (memberData.email) dbMemberData['email'] = memberData.email;
    if (memberData.phone) dbMemberData['phone'] = memberData.phone;
    if (memberData.membershipType) dbMemberData['membershiptype'] = memberData.membershipType;
    if (memberData.startDate) dbMemberData['startdate'] = memberData.startDate;
    if (memberData.endDate) dbMemberData['enddate'] = memberData.endDate;
    if (memberData.status) dbMemberData['status'] = memberData.status;
    if (memberData.dateOfBirth) dbMemberData['dateofbirth'] = memberData.dateOfBirth;
    if (memberData.gender) dbMemberData['gender'] = memberData.gender;
    if (memberData.address) dbMemberData['address'] = memberData.address;
    if (memberData.emergencyContact) dbMemberData['emergencycontact'] = memberData.emergencyContact;
    if (memberData.membershipPlan) dbMemberData['membershipplan'] = memberData.membershipPlan;
    if (memberData.membershipCategory) dbMemberData['membershipcategory'] = memberData.membershipCategory;
    if (memberData.trainerAssigned) dbMemberData['trainerassigned'] = memberData.trainerAssigned;
    if (memberData.workoutGoals) dbMemberData['workoutgoals'] = memberData.workoutGoals;
    if (memberData.medicalConditions) dbMemberData['medicalconditions'] = memberData.medicalConditions;
    if (memberData.preferredWorkoutTime) dbMemberData['preferredworkouttime'] = memberData.preferredWorkoutTime;
    if (memberData.paymentStatus) dbMemberData['paymentstatus'] = memberData.paymentStatus;
    if (memberData.discountsUsed) dbMemberData['discountsused'] = memberData.discountsUsed;
    if (memberData.notes) dbMemberData['notes'] = memberData.notes;
    if (memberData.profilePicture) dbMemberData['profilepicture'] = memberData.profilePicture;
    if (memberData.nfcCardId) dbMemberData['nfccardid'] = memberData.nfcCardId;
    if (memberData.fingerprintId) dbMemberData['fingerprintid'] = memberData.fingerprintId;
    if (memberData.username) dbMemberData['username'] = memberData.username;
    if (memberData.passwordResetRequired !== undefined) dbMemberData['passwordresetrequired'] = memberData.passwordResetRequired;
    if (memberData.accountEnabled !== undefined) dbMemberData['accountenabled'] = memberData.accountEnabled;
    if (memberData.lastLogin) dbMemberData['lastlogin'] = memberData.lastLogin;
    if (memberData.linkedToCompany !== undefined) dbMemberData['linkedtocompany'] = memberData.linkedToCompany;
    if (memberData.linkedCompanyId) dbMemberData['linkedcompanyid'] = memberData.linkedCompanyId;
    
    const { data, error } = await supabase
      .from('members')
      .update(dbMemberData)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating member:', error);
      return null;
    }
    
    console.log('Response after updating member:', data);
    
    if (!data || data.length === 0) {
      console.log('No data returned after updating member');
      return null;
    }

    const memberResult = data[0] as Record<string, any>;
    if (!memberResult) {
      console.log('Member result is null after updating');
      return null;
    }
    
    // Convert back to camelCase for frontend
    return {
      id: memberResult.id || '',
      name: memberResult.name || '',
      email: memberResult.email || '',
      phone: memberResult.phone || '',
      membershipType: memberResult.membershiptype || '',
      startDate: memberResult.startdate || '',
      endDate: memberResult.enddate || '',
      status: memberResult.status || 'Active',
      lastCheckin: memberResult.lastcheckin || '',
    } as Member;
  } catch (error) {
    console.error('Error in updateMember:', error);
    return null;
  }
};

export const deleteMember = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting member with ID ${id}`);
    
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting member:', error);
      return false;
    }
    
    console.log('Member deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in deleteMember:', error);
    return false;
  }
};

export const updateMemberStatus = async (id: string, newStatus: string): Promise<Member | null> => {
  try {
    console.log(`Updating status for member ${id} to ${newStatus}`);
    
    const { data, error } = await supabase
      .from('members')
      .update({ status: newStatus })
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating member status:', error);
      return null;
    }
    
    console.log('Response after updating member status:', data);
    
    if (!data || data.length === 0) {
      console.log('No data returned after updating member status');
      return null;
    }
    
    const memberResult = data[0] as Record<string, any>;
    if (!memberResult) {
      console.log('Member result is null after updating status');
      return null;
    }
    
    return {
      id: memberResult.id || '',
      name: memberResult.name || '',
      email: memberResult.email || '',
      phone: memberResult.phone || '',
      membershipType: memberResult.membershiptype || '',
      startDate: memberResult.startdate || '',
      endDate: memberResult.enddate || '',
      status: memberResult.status || 'Active',
      lastCheckin: memberResult.lastcheckin || '',
    } as Member;
  } catch (error) {
    console.error('Error in updateMemberStatus:', error);
    return null;
  }
};
