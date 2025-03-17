
import { useState } from 'react';
import { toast } from 'sonner';
import { Member } from '@/types/memberTypes';

export const useMemberActions = (
  members: Member[],
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>,
  selectedMembers: number[],
  setSelectedMembers: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const handleStatusChange = (memberId: number, newStatus: string) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleDelete = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
    setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    toast.success('Member deleted successfully');
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prevSelected => 
      prevSelected.includes(memberId)
        ? prevSelected.filter(id => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const selectAllMembers = (filteredMembers: Member[]) => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };

  const handleBulkAction = (action: string, filteredMembers: Member[]) => {
    if (selectedMembers.length === 0) {
      toast.error('No members selected');
      return;
    }

    if (action === 'activate') {
      setMembers(members.map(member => 
        selectedMembers.includes(member.id) ? { ...member, status: 'Active' } : member
      ));
      toast.success(`${selectedMembers.length} members activated`);
    } else if (action === 'deactivate') {
      setMembers(members.map(member => 
        selectedMembers.includes(member.id) ? { ...member, status: 'Inactive' } : member
      ));
      toast.success(`${selectedMembers.length} members deactivated`);
    } else if (action === 'delete') {
      setMembers(members.filter(member => !selectedMembers.includes(member.id)));
      setSelectedMembers([]);
      toast.success(`${selectedMembers.length} members deleted`);
    } else if (action === 'export') {
      toast.success(`Exporting data for ${selectedMembers.length} members`);
    } else if (action === 'email') {
      toast.success(`Sending email reminder to ${selectedMembers.length} members`);
    } else if (action === 'sms') {
      toast.success(`Sending SMS reminder to ${selectedMembers.length} members`);
    }
  };

  return {
    handleStatusChange,
    handleDelete,
    toggleMemberSelection,
    selectAllMembers,
    handleBulkAction,
  };
};
