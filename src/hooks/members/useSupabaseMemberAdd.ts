
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Member, MemberFormAction } from '@/types/memberTypes';

export const useSupabaseMemberAdd = () => {
  // Custom addMember function that uses Supabase
  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction): Promise<boolean> => {
    try {
      console.log("Starting addMember with data:", memberData);
      
      // Format data for Supabase - convert camelCase to snake_case
      const dbMemberData = {
        name: memberData.name,
        email: memberData.email,
        phone: memberData.phone,
        membershiptype: memberData.membershipType,
        startdate: new Date().toISOString(),
        enddate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        status: memberData.status || 'Active',
        gender: memberData.gender,
        address: memberData.address,
        emergencycontact: memberData.emergencyContact,
        membershipplan: memberData.membershipPlan || 'Monthly',
        membershipcategory: memberData.membershipCategory || 'Individual',
        trainerassigned: memberData.trainerAssigned,
        workoutgoals: memberData.workoutGoals,
        medicalconditions: memberData.medicalConditions,
        preferredworkouttime: memberData.preferredWorkoutTime,
        paymentstatus: memberData.paymentStatus || 'Pending',
        discountsused: memberData.discountsUsed || 'No',
        notes: memberData.notes,
        username: memberData.username,
        passwordresetrequired: memberData.passwordResetRequired !== undefined ? memberData.passwordResetRequired : true,
        accountenabled: memberData.accountEnabled !== undefined ? memberData.accountEnabled : true,
        linkedtocompany: memberData.linkedToCompany || false,
        linkedcompanyid: memberData.linkedCompanyId
      };
      
      console.log("Prepared member data for Supabase:", dbMemberData);
        
      const { data, error } = await supabase
        .from('members')
        .insert([dbMemberData])
        .select();
        
      if (error) {
        console.error('Error adding member:', error);
        toast.error('Failed to add member: ' + error.message);
        return false;
      }
      
      console.log("Supabase insert response:", data);
      toast.success('Member added successfully');
      return true;
    } catch (error) {
      console.error('Error in addMember:', error);
      toast.error('Failed to add member: ' + (error instanceof Error ? error.message : String(error)));
      return false;
    }
  };

  return {
    addMember
  };
};
