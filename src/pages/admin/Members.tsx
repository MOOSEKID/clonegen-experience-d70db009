
import { useMembers } from '@/hooks/useMembers';
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
  } = useMembers();

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
      onSearchChange={handleSearch}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      onToggleSelect={toggleMemberSelection}
      onSelectAll={selectAllMembers}
      onFilterChange={handleFilterChange}
      onBulkAction={handleBulkAction}
      onAddMember={addMember}
      onImportMembers={importMembers}
      onPageChange={paginate}
      onPrevPage={prevPage}
      onNextPage={nextPage}
    />
  );
};

export default AdminMembers;
