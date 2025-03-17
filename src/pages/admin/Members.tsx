
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

  // Adapt props to match what MembersContainer expects
  const handleSearchChange = (value: string) => {
    handleSearch(value);
  };

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
      onItemsPerPageChange={(itemsPerPage: number) => console.log("Items per page changed:", itemsPerPage)}
      onViewProfile={(memberId) => console.log("View profile", memberId)}
      itemsPerPage={10}
      totalItems={members.length}
    />
  );
};

export default AdminMembers;
