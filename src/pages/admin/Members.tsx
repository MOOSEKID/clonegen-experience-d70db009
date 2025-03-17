
import React from 'react';
import { useSupabaseMembers } from '@/hooks/members/useSupabaseMembers';
import MembersContainer from '@/components/admin/members/MembersContainer';

const AdminMembers = () => {
  const {
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
    handleSearch,
    handleStatusChange,
    handleDelete,
    handleFilterChange,
    toggleMemberSelection,
    selectAllMembers,
    handleBulkAction,
    addMember,
    importMembers,
    paginate,
    nextPage,
    prevPage,
  } = useSupabaseMembers();

  console.log("AdminMembers rendered, isCreating:", isCreating);

  // Adapt handler to match what's expected (an event object)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  // Create handler for items per page change
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    console.log("Items per page changed:", itemsPerPage);
    // Implementation would go here
  };

  // Fixed membersPerPage prop to match what MembersContainer expects
  return (
    <MembersContainer
      members={members}
      filteredMembers={filteredMembers}
      currentMembers={currentMembers}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedMembers={selectedMembers}
      searchTerm={searchTerm}
      statusFilter={filterType}
      membershipFilter={filterType}
      handleSearchChange={handleSearchChange}
      handleStatusChange={handleStatusChange}
      handleDelete={handleDelete}
      handleStatusFilterChange={handleFilterChange}
      handleMembershipFilterChange={handleFilterChange}
      toggleMemberSelection={toggleMemberSelection}
      selectAllMembers={() => selectAllMembers(filteredMembers)}
      handlePageChange={paginate}
      handleItemsPerPageChange={handleItemsPerPageChange}
      onViewProfile={(memberId) => console.log("View profile", memberId)}
      membersPerPage={10}
      totalItems={members.length}
    />
  );
};

export default AdminMembers;
