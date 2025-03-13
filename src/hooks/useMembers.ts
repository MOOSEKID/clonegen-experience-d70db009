
import { useState } from 'react';
import { Member, MemberFormAction } from '@/types/memberTypes';
import { mockMembers } from '@/data/memberData';
import { useMemberActions } from './members/useMemberActions';
import { useMemberFilters } from './members/useMemberFilters';
import { useMemberCreation } from './members/useMemberCreation';

export type { Member } from '@/types/memberTypes';

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const {
    handleStatusChange,
    handleDelete,
    toggleMemberSelection,
    selectAllMembers,
    handleBulkAction,
  } = useMemberActions(members, setMembers, selectedMembers, setSelectedMembers);

  const {
    searchTerm,
    filterType,
    filteredMembers,
    currentMembers,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    paginate,
    nextPage,
    prevPage,
  } = useMemberFilters(members);

  const {
    addMember,
    importMembers,
    isCreating
  } = useMemberCreation(members, setMembers);

  return {
    members,
    selectedMembers,
    searchTerm,
    filteredMembers,
    currentMembers,
    currentPage,
    totalPages,
    filterType,
    isCreating,
    handleSearch,
    handleStatusChange,
    handleDelete,
    handleFilterChange,
    toggleMemberSelection,
    selectAllMembers: () => selectAllMembers(filteredMembers),
    handleBulkAction: (action: string) => handleBulkAction(action, filteredMembers),
    addMember,
    importMembers,
    paginate,
    nextPage,
    prevPage,
  };
};
