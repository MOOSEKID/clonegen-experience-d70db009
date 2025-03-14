
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/memberTypes';

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
