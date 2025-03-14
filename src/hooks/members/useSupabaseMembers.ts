
import { useState, useEffect } from 'react';
import { Member, MemberFormAction } from '@/types/memberTypes';
import { useMemberFilters } from './useMemberFilters';
import { useMemberCreation } from './useMemberCreation';
import { useSupabaseMemberData } from './useSupabaseMemberData';
import { useSupabaseMemberSelection } from './useSupabaseMemberSelection';
import { useSupabaseMemberStatus } from './useSupabaseMemberStatus';
import { useSupabaseMemberBulkActions } from './useSupabaseMemberBulkActions';
import { useSupabaseMemberAdd } from './useSupabaseMemberAdd';

export const useSupabaseMembers = () => {
  // Get member data with Supabase realtime subscription
  const { members, isLoading, error, setMembers } = useSupabaseMemberData();
  
  // Member selection state and actions
  const { 
    selectedMembers,
    toggleMemberSelection,
    selectAllMembers,
    setSelectedMembers
  } = useSupabaseMemberSelection();

  // Filter and pagination
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
    setAllMembers
  } = useMemberFilters([]);

  // Update filtered members when members list changes
  useEffect(() => {
    if (members && members.length > 0) {
      console.log('Updating filtered members with:', members.length, 'members');
      setAllMembers(members);
    }
  }, [members, setAllMembers]);

  // Member status and deletion actions
  const { 
    handleStatusChange,
    handleDelete
  } = useSupabaseMemberStatus();

  // Bulk actions
  const { handleBulkAction } = useSupabaseMemberBulkActions(
    selectedMembers,
    setSelectedMembers
  );

  // Member creation (with existing hook for functionality beyond simple add)
  const {
    importMembers,
    importCompanyEmployees,
    isCreating
  } = useMemberCreation(members, setMembers);

  // Specialized Supabase-specific addMember function
  const { addMember } = useSupabaseMemberAdd();

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
    isLoading,
    error,
    handleSearch,
    handleStatusChange,
    handleDelete,
    handleFilterChange,
    toggleMemberSelection,
    selectAllMembers,
    handleBulkAction,
    addMember,
    importMembers,
    importCompanyEmployees,
    paginate,
    nextPage,
    prevPage,
  };
};
