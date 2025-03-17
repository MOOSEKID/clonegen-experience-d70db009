
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
    statusFilter,
    membershipFilter,
    membersPerPage,
    isCreating,
    isLoading,
    handleSearch,
    handleStatusChange,
    handleDelete,
    handleStatusFilterChange,
    handleMembershipFilterChange,
    toggleMemberSelection,
    selectAllMembers,
    handleBulkAction,
    addMember,
    importMembers,
    paginate,
    nextPage,
    prevPage,
    handleItemsPerPageChange
  } = useSupabaseMembers();

  console.log("AdminMembers rendered, isCreating:", isCreating);

  return (
    <MembersContainer
      members={members}
      filteredMembers={filteredMembers}
      currentMembers={currentMembers}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedMembers={selectedMembers}
      membersPerPage={membersPerPage}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      membershipFilter={membershipFilter}
      handleSearchChange={handleSearch}
      handleStatusChange={handleStatusChange}
      handleDelete={handleDelete}
      handleStatusFilterChange={handleStatusFilterChange}
      handleMembershipFilterChange={handleMembershipFilterChange}
      toggleMemberSelection={toggleMemberSelection}
      selectAllMembers={selectAllMembers}
      handlePageChange={paginate}
      handleItemsPerPageChange={handleItemsPerPageChange}
      onViewProfile={(memberId) => console.log("View profile", memberId)}
    />
  );
};

export default AdminMembers;
