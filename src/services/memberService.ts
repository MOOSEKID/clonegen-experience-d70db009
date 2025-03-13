
import { supabase } from '@/integrations/supabase/client';
import { MemberInfo } from '@/types/classTypes';

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
export const fetchMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    
    // Ensure data is not null before mapping
    if (!data) return [];
    
    // Convert database field names to camelCase for frontend
    return data.map(member => {
      // Ensure member is not null before accessing properties
      if (!member) return null;
      
      return {
        id: member.id || '',
        name: member.name || '',
        email: member.email || '',
        phone: member.phone || '',
        membershipType: member.membershiptype || '',
        startDate: member.startdate || '',
        endDate: member.enddate || '',
        status: member.status || 'Active',
        lastCheckin: member.lastcheckin || '',
        dateOfBirth: member.dateofbirth || '',
        gender: member.gender || '',
        address: member.address || '',
        emergencyContact: member.emergencycontact || '',
        membershipPlan: member.membershipplan || '',
        membershipCategory: member.membershipcategory || '',
        trainerAssigned: member.trainerassigned || '',
        workoutGoals: member.workoutgoals || '',
        medicalConditions: member.medicalconditions || '',
        preferredWorkoutTime: member.preferredworkouttime || [],
        paymentStatus: member.paymentstatus || '',
        discountsUsed: member.discountsused || '',
        notes: member.notes || '',
        profilePicture: member.profilepicture || '',
        nfcCardId: member.nfccardid || '',
        fingerprintId: member.fingerprintid || '',
        username: member.username || '',
        passwordResetRequired: member.passwordresetrequired ?? true,
        accountEnabled: member.accountenabled ?? true,
        lastLogin: member.lastlogin || '',
        linkedToCompany: member.linkedtocompany ?? false,
        linkedCompanyId: member.linkedcompanyid || '',
        created_at: member.created_at || '',
        updated_at: member.updated_at || ''
      };
    }).filter(Boolean); // Filter out any null values
  } catch (error) {
    console.error('Error in fetchMembers:', error);
    return [];
  }
};

export const addMember = async (memberData) => {
  try {
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
    
    // Convert back to camelCase for frontend
    if (!data || data.length === 0) {
      return null;
    }

    const member = data[0] || {};
    
    return {
      id: member.id || '',
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      membershipType: member.membershiptype || '',
      startDate: member.startdate || '',
      endDate: member.enddate || '',
      status: member.status || 'Active',
      lastCheckin: member.lastcheckin || '',
    };
  } catch (error) {
    console.error('Error in addMember:', error);
    return null;
  }
};

export const updateMember = async (id, memberData) => {
  try {
    // Convert camelCase to database field names (lowercase)
    const dbMemberData = {};
    
    // Map only the fields that are being updated
    if (memberData.name) dbMemberData.name = memberData.name;
    if (memberData.email) dbMemberData.email = memberData.email;
    if (memberData.phone) dbMemberData.phone = memberData.phone;
    if (memberData.membershipType) dbMemberData.membershiptype = memberData.membershipType;
    if (memberData.startDate) dbMemberData.startdate = memberData.startDate;
    if (memberData.endDate) dbMemberData.enddate = memberData.endDate;
    if (memberData.status) dbMemberData.status = memberData.status;
    if (memberData.dateOfBirth) dbMemberData.dateofbirth = memberData.dateOfBirth;
    if (memberData.gender) dbMemberData.gender = memberData.gender;
    if (memberData.address) dbMemberData.address = memberData.address;
    if (memberData.emergencyContact) dbMemberData.emergencycontact = memberData.emergencyContact;
    if (memberData.membershipPlan) dbMemberData.membershipplan = memberData.membershipPlan;
    if (memberData.membershipCategory) dbMemberData.membershipcategory = memberData.membershipCategory;
    if (memberData.trainerAssigned) dbMemberData.trainerassigned = memberData.trainerAssigned;
    if (memberData.workoutGoals) dbMemberData.workoutgoals = memberData.workoutGoals;
    if (memberData.medicalConditions) dbMemberData.medicalconditions = memberData.medicalConditions;
    if (memberData.preferredWorkoutTime) dbMemberData.preferredworkouttime = memberData.preferredWorkoutTime;
    if (memberData.paymentStatus) dbMemberData.paymentstatus = memberData.paymentStatus;
    if (memberData.discountsUsed) dbMemberData.discountsused = memberData.discountsUsed;
    if (memberData.notes) dbMemberData.notes = memberData.notes;
    if (memberData.profilePicture) dbMemberData.profilepicture = memberData.profilePicture;
    if (memberData.nfcCardId) dbMemberData.nfccardid = memberData.nfcCardId;
    if (memberData.fingerprintId) dbMemberData.fingerprintid = memberData.fingerprintId;
    if (memberData.username) dbMemberData.username = memberData.username;
    if (memberData.passwordResetRequired !== undefined) dbMemberData.passwordresetrequired = memberData.passwordResetRequired;
    if (memberData.accountEnabled !== undefined) dbMemberData.accountenabled = memberData.accountEnabled;
    if (memberData.lastLogin) dbMemberData.lastlogin = memberData.lastLogin;
    if (memberData.linkedToCompany !== undefined) dbMemberData.linkedtocompany = memberData.linkedToCompany;
    if (memberData.linkedCompanyId) dbMemberData.linkedcompanyid = memberData.linkedCompanyId;
    
    const { data, error } = await supabase
      .from('members')
      .update(dbMemberData)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating member:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return null;
    }

    const member = data[0] || {};
    
    // Convert back to camelCase for frontend
    return {
      id: member.id || '',
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      membershipType: member.membershiptype || '',
      startDate: member.startdate || '',
      endDate: member.enddate || '',
      status: member.status || 'Active',
      lastCheckin: member.lastcheckin || '',
    };
  } catch (error) {
    console.error('Error in updateMember:', error);
    return null;
  }
};

export const deleteMember = async (id) => {
  try {
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting member:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteMember:', error);
    return false;
  }
};

export const updateMemberStatus = async (id, newStatus) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .update({ status: newStatus })
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating member status:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return null;
    }
    
    const member = data[0] || {};
    
    return {
      id: member.id || '',
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      membershipType: member.membershiptype || '',
      startDate: member.startdate || '',
      endDate: member.enddate || '',
      status: member.status || 'Active',
      lastCheckin: member.lastcheckin || '',
    };
  } catch (error) {
    console.error('Error in updateMemberStatus:', error);
    return null;
  }
};
