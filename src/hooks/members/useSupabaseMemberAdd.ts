
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Member, MemberFormAction } from '@/types/memberTypes';

export const useSupabaseMemberAdd = () => {
  // Mock addMember function that uses local data instead of Supabase
  const addMember = async (memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction): Promise<boolean> => {
    try {
      console.log("Starting useSupabaseMemberAdd with data:", memberData);
      
      if (!memberData || !memberData.name || !memberData.email) {
        console.error("Invalid member data:", memberData);
        toast.error('Missing required member data');
        return false;
      }
      
      // Mock successful member creation
      console.log("Member would be created with this data:", JSON.stringify(memberData, null, 2));
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
