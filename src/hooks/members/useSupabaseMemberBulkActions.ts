
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';
import { updateMemberStatus, deleteMember } from '@/services/memberService';

export const useSupabaseMemberBulkActions = (
  selectedMembers: string[],
  setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>
) => {
  // Handle bulk actions
  const handleBulkAction = async (action: string, targetMembers: Member[]) => {
    if (selectedMembers.length === 0) {
      toast.error('No members selected');
      return;
    }

    const targetIds = targetMembers
      .filter(m => selectedMembers.includes(m.id as string))
      .map(m => m.id as string);

    try {
      switch (action) {
        case 'activate':
          for (const id of targetIds) {
            await updateMemberStatus(id, 'Active');
          }
          toast.success(`${targetIds.length} members activated`);
          break;
        case 'deactivate':
          for (const id of targetIds) {
            await updateMemberStatus(id, 'Inactive');
          }
          toast.success(`${targetIds.length} members deactivated`);
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete ${targetIds.length} members? This action cannot be undone.`)) {
            for (const id of targetIds) {
              await deleteMember(id);
            }
            toast.success(`${targetIds.length} members deleted`);
          }
          break;
        case 'export':
          toast.success('Export functionality coming soon');
          break;
        case 'email':
          toast.success('Email sending functionality coming soon');
          break;
        case 'sms':
          toast.success('SMS sending functionality coming soon');
          break;
        default:
          toast.error('Unknown action');
      }
    } catch (error) {
      console.error(`Error performing bulk action ${action}:`, error);
      toast.error(`Failed to perform ${action} on members`);
    } finally {
      setSelectedMembers([]);
    }
  };

  return {
    handleBulkAction
  };
};
