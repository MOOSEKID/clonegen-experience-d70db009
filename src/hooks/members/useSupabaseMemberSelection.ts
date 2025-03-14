
import { useState } from 'react';
import { Member } from '@/types/memberTypes';

export const useSupabaseMemberSelection = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Toggle member selection
  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  // Select all members
  const selectAllMembers = (membersToSelect: Member[]) => {
    if (selectedMembers.length === membersToSelect.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(membersToSelect.map(m => m.id as string));
    }
  };

  return {
    selectedMembers,
    toggleMemberSelection,
    selectAllMembers,
    setSelectedMembers
  };
};
