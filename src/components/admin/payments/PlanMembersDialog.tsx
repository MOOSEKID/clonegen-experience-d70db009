
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddMemberToPlanDialog } from './AddMemberToPlanDialog';
import { toast } from 'sonner';
import { mockMembers } from '@/data/mockMembersData';

interface PlanMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planId: string;
}

export const PlanMembersDialog = ({ isOpen, onClose, planName, planId }: PlanMembersDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(mockMembers);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);

  const filteredMembers = members.filter(
    member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Past Due':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = (memberData: any) => {
    // In a real application, this would make an API call to add the member
    const newMember = {
      id: `temp-${Date.now()}`,
      name: memberData.name,
      email: memberData.email,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    
    setMembers([...members, newMember]);
    toast.success(`Added ${memberData.name} to ${planName} plan`);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Members on "{planName}" Plan</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div className="relative flex-grow w-full sm:mr-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              className="gap-2 whitespace-nowrap w-full sm:w-auto"
              onClick={() => setIsAddMemberDialogOpen(true)}
            >
              <UserPlus className="h-4 w-4" /> Add Member
            </Button>
          </div>
          
          <ScrollArea className="flex-grow h-[400px]">
            {filteredMembers.length > 0 ? (
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium">{member.name}</h3>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-14 sm:ml-0">
                      <span className="text-xs text-gray-500">Joined {new Date(member.joinDate || Date.now()).toLocaleDateString()}</span>
                      <Badge className={`${getStatusColor(member.status || 'Active')}`}>
                        {member.status || 'Active'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No members found matching your search.</p>
              </div>
            )}
          </ScrollArea>
          
          <div className="pt-4 border-t mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Total members: {members.length}
              </div>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddMemberToPlanDialog
        isOpen={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        onAddMember={handleAddMember}
        planName={planName}
        planId={planId}
      />
    </>
  );
};
