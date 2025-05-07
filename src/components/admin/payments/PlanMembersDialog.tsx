
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for demonstration
const mockMembers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    joinDate: '2023-03-15',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    joinDate: '2023-04-10',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    joinDate: '2023-02-28',
    status: 'Past Due'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    joinDate: '2023-01-05',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    joinDate: '2023-05-20',
    status: 'Inactive'
  },
];

interface PlanMembersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planId: string;
}

export const PlanMembersDialog = ({ isOpen, onClose, planName, planId }: PlanMembersDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(mockMembers);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Members on "{planName}" Plan</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-grow mr-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Add Member
          </Button>
        </div>
        
        <ScrollArea className="flex-grow h-[400px]">
          {filteredMembers.length > 0 ? (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 flex items-center justify-between">
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
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                    <Badge className={`${getStatusColor(member.status)}`}>
                      {member.status}
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
  );
};
