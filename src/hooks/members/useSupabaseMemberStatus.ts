
import { toast } from 'sonner';
import { updateMemberStatus, deleteMember } from '@/services/memberService';

export const useSupabaseMemberStatus = () => {
  // Handle status change
  const handleStatusChange = async (memberId: string, newStatus: string) => {
    try {
      const updatedMember = await updateMemberStatus(memberId, newStatus);
      if (updatedMember) {
        toast.success(`Member status updated to ${newStatus}`);
        // The real-time subscription will update the list
      } else {
        toast.error('Failed to update member status');
      }
    } catch (error) {
      console.error('Error updating member status:', error);
      toast.error('Failed to update member status');
    }
  };

  // Handle member deletion
  const handleDelete = async (memberId: string) => {
    try {
      const success = await deleteMember(memberId);
      if (success) {
        toast.success('Member deleted successfully');
        // The real-time subscription will update the list
      } else {
        toast.error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error('Failed to delete member');
    }
  };

  return {
    handleStatusChange,
    handleDelete
  };
};
