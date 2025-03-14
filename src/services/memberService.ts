
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
    const members = data.map(memberData => {
      // Ensure memberData is not null before accessing properties
      if (!memberData) return null;
      
      // Type assertion to avoid TS errors
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
        linkedCompanyId: memberData.linkedcompanyid || '',
        created_at: memberData.created_at || '',
        updated_at: memberData.updated_at || ''
      } as Member;
    }).filter(Boolean) as Member[]; // Filter out any null values
    
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

    const memberResult = data[0];
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

    const memberResult = data[0];
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
    
    const memberResult = data[0];
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
