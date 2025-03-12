
import { useState } from 'react';
import { toast } from 'sonner';
import { mockMembers } from '@/components/admin/members/MemberData';
import MemberHeader from '@/components/admin/members/MemberHeader';
import MembersToolbar from '@/components/admin/members/MembersToolbar';
import MemberTable from '@/components/admin/members/MemberTable';
import MemberPagination from '@/components/admin/members/MemberPagination';

const AdminMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(mockMembers);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you would search the database here
  };

  const handleStatusChange = (memberId: number, newStatus: string) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleDelete = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast.success('Member deleted successfully');
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prevSelected => 
      prevSelected.includes(memberId)
        ? prevSelected.filter(id => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const selectAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map(member => member.id));
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <MemberHeader />
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <MembersToolbar 
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          selectedMembers={selectedMembers}
        />

        <MemberTable 
          members={members}
          filteredMembers={filteredMembers}
          selectedMembers={selectedMembers}
          toggleMemberSelection={toggleMemberSelection}
          selectAllMembers={selectAllMembers}
          handleStatusChange={handleStatusChange}
          handleDelete={handleDelete}
        />

        <MemberPagination 
          filteredCount={filteredMembers.length}
          totalCount={members.length}
        />
      </div>
    </div>
  );
};

export default AdminMembers;
