
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/memberTypes';

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
