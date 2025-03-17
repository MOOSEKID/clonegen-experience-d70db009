
import React, { useState } from 'react';
import { useSupabaseMembers } from '@/hooks/members/useSupabaseMembers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemberTable from '@/components/admin/members/MemberTable';
import MemberHeader from '@/components/admin/members/MemberHeader';
import MembersToolbar from '@/components/admin/members/MembersToolbar';
import MemberPagination from '@/components/admin/members/MemberPagination';
import AddMemberDialog from '@/components/admin/members/AddMemberDialog';
import { Member } from '@/types/memberTypes';
import MemberProfileDialog from '@/components/admin/members/MemberProfileDialog';
import { Skeleton } from '@/components/ui/skeleton';

const MemberManagement = () => {
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

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  const handleViewProfile = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      setSelectedMember(member);
    }
  };
  
  const closeProfileDialog = () => {
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Member Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all" onClick={() => handleFilterChange('all')}>All Members</TabsTrigger>
                <TabsTrigger value="active" onClick={() => handleFilterChange('active')}>Active</TabsTrigger>
                <TabsTrigger value="inactive" onClick={() => handleFilterChange('inactive')}>Inactive</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsAddMemberOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <span>Add Member</span>
                </button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                <MembersToolbar 
                  searchTerm={searchTerm}
                  onSearchChange={handleSearch}
                  selectedMembers={selectedMembers}
                  onFilterChange={handleFilterChange}
                  onBulkAction={handleBulkAction}
                  filterType={filterType}
                />
                
                {isLoading ? (
                  <div className="p-6 space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <Skeleton key={index} className="w-full h-16 rounded-md" />
                    ))}
                  </div>
                ) : (
                  <MemberTable 
                    members={members}
                    filteredMembers={filteredMembers}
                    currentMembers={currentMembers}
                    selectedMembers={selectedMembers}
                    toggleMemberSelection={toggleMemberSelection}
                    selectAllMembers={selectAllMembers}
                    handleStatusChange={handleStatusChange}
                    handleDelete={handleDelete}
                    onViewProfile={handleViewProfile}
                  />
                )}
                
                <MemberPagination 
                  filteredCount={filteredMembers.length}
                  totalCount={members.length}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={paginate}
                  onPrevPage={prevPage}
                  onNextPage={nextPage}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              <div className="space-y-4">
                <MembersToolbar 
                  searchTerm={searchTerm}
                  onSearchChange={handleSearch}
                  selectedMembers={selectedMembers}
                  onFilterChange={handleFilterChange}
                  onBulkAction={handleBulkAction}
                  filterType="active"
                />
                
                {isLoading ? (
                  <div className="p-6 space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <Skeleton key={index} className="w-full h-16 rounded-md" />
                    ))}
                  </div>
                ) : (
                  <MemberTable 
                    members={members}
                    filteredMembers={filteredMembers.filter(m => m.status === 'Active')}
                    currentMembers={currentMembers.filter(m => m.status === 'Active')}
                    selectedMembers={selectedMembers}
                    toggleMemberSelection={toggleMemberSelection}
                    selectAllMembers={selectAllMembers}
                    handleStatusChange={handleStatusChange}
                    handleDelete={handleDelete}
                    onViewProfile={handleViewProfile}
                  />
                )}
                
                <MemberPagination 
                  filteredCount={filteredMembers.filter(m => m.status === 'Active').length}
                  totalCount={members.filter(m => m.status === 'Active').length}
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredMembers.filter(m => m.status === 'Active').length / 10)}
                  onPageChange={paginate}
                  onPrevPage={prevPage}
                  onNextPage={nextPage}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="inactive" className="mt-0">
              <div className="space-y-4">
                <MembersToolbar 
                  searchTerm={searchTerm}
                  onSearchChange={handleSearch}
                  selectedMembers={selectedMembers}
                  onFilterChange={handleFilterChange}
                  onBulkAction={handleBulkAction}
                  filterType="inactive"
                />
                
                {isLoading ? (
                  <div className="p-6 space-y-4">
                    {[...Array(5)].map((_, index) => (
                      <Skeleton key={index} className="w-full h-16 rounded-md" />
                    ))}
                  </div>
                ) : (
                  <MemberTable 
                    members={members}
                    filteredMembers={filteredMembers.filter(m => m.status === 'Inactive')}
                    currentMembers={currentMembers.filter(m => m.status === 'Inactive')}
                    selectedMembers={selectedMembers}
                    toggleMemberSelection={toggleMemberSelection}
                    selectAllMembers={selectAllMembers}
                    handleStatusChange={handleStatusChange}
                    handleDelete={handleDelete}
                    onViewProfile={handleViewProfile}
                  />
                )}
                
                <MemberPagination 
                  filteredCount={filteredMembers.filter(m => m.status === 'Inactive').length}
                  totalCount={members.filter(m => m.status === 'Inactive').length}
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredMembers.filter(m => m.status === 'Inactive').length / 10)}
                  onPageChange={paginate}
                  onPrevPage={prevPage}
                  onNextPage={nextPage}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <AddMemberDialog 
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={addMember}
        isCreating={isCreating}
      />
      
      {selectedMember && (
        <MemberProfileDialog
          isOpen={!!selectedMember}
          onClose={closeProfileDialog}
          member={selectedMember}
        />
      )}
    </div>
  );
};

export default MemberManagement;
