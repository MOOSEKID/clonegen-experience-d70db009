
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

  return (
    <MembersContainer
      members={members}
      filteredMembers={filteredMembers}
      currentMembers={currentMembers}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedMembers={selectedMembers}
      searchTerm={searchTerm}
      filterType={filterType}
      isCreating={isCreating}
      isLoading={isLoading}
      onSearchChange={handleSearch}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      onToggleSelect={toggleMemberSelection}
      onSelectAll={() => selectAllMembers(filteredMembers)}
      onFilterChange={handleFilterChange}
      onBulkAction={(action) => handleBulkAction(action, filteredMembers)}
      onPageChange={paginate}
      onPrevPage={prevPage}
      onNextPage={nextPage}
      onAddMember={addMember}
      onImportMembers={importMembers}
    />
  );
};

export default AdminMembers;
