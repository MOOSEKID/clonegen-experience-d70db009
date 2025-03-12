
import { useMembers } from '@/hooks/useMembers';
import MembersContainer from '@/components/admin/members/MembersContainer';

const AdminMembers = () => {
  const {
    members,
    selectedMembers,
    searchTerm,
    filteredMembers,
    handleSearch,
    handleStatusChange,
    handleDelete,
    toggleMemberSelection,
    selectAllMembers,
  } = useMembers();

  return (
    <MembersContainer
      members={members}
      filteredMembers={filteredMembers}
      selectedMembers={selectedMembers}
      searchTerm={searchTerm}
      onSearchChange={handleSearch}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      onToggleSelect={toggleMemberSelection}
      onSelectAll={selectAllMembers}
    />
  );
};

export default AdminMembers;
