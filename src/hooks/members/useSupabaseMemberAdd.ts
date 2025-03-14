
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Member, MemberFormAction } from '@/types/memberTypes';

export const useSupabaseMemberAdd = () => {
  // Custom addMember function that uses Supabase
  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction): Promise<boolean> => {
    try {
      console.log("Starting addMember with data:", memberData);
      
      if (!memberData || !memberData.name || !memberData.email) {
        console.error("Invalid member data:", memberData);
        toast.error('Missing required member data');
        return false;
      }
      
      // Format data for Supabase - convert camelCase to snake_case
      const dbMemberData = {
        name: memberData.name,
        email: memberData.email,
        phone: memberData.phone || null,
        membershiptype: memberData.membershipType || 'Standard',
        startdate: new Date().toISOString(),
        enddate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        status: memberData.status || 'Active',
        gender: memberData.gender || null,
        address: memberData.address || null,
        emergencycontact: memberData.emergencyContact || null,
        membershipplan: memberData.membershipPlan || 'Monthly',
        membershipcategory: memberData.membershipCategory || 'Individual',
        trainerassigned: memberData.trainerAssigned || null,
        workoutgoals: memberData.workoutGoals || null,
        medicalconditions: memberData.medicalConditions || null,
        preferredworkouttime: memberData.preferredWorkoutTime || [],
        paymentstatus: memberData.paymentStatus || 'Pending',
        discountsused: memberData.discountsUsed || 'No',
        notes: memberData.notes || null,
        username: memberData.username || null,
        passwordresetrequired: memberData.passwordResetRequired !== undefined ? memberData.passwordResetRequired : true,
        accountenabled: memberData.accountEnabled !== undefined ? memberData.accountEnabled : true,
        linkedtocompany: memberData.linkedToCompany || false,
        linkedcompanyid: memberData.linkedCompanyId || null,
        dateofbirth: memberData.dateOfBirth || null,
        profilepicture: memberData.profilePicture || null,
        nfccardid: memberData.nfcCardId || null,
        fingerprintid: memberData.fingerprintId || null
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
      
      if (!data || data.length === 0) {
        console.error('No data returned from insert operation');
        toast.error('Failed to add member: No data returned');
        return false;
      }
      
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
