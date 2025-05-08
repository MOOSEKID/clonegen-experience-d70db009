
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface Member {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  lastActivity: string;
}

interface ProgramMembersDialogProps {
  programId: string;
  programName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProgramMembersDialog = ({ programId, programName, open, onOpenChange }: ProgramMembersDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, this would be fetched from a database
  const members: Member[] = [
    { id: '1', name: 'John Smith', email: 'john@example.com', status: 'active', progress: 65, lastActivity: '2 days ago' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'completed', progress: 100, lastActivity: '1 week ago' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', status: 'active', progress: 45, lastActivity: 'Yesterday' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', status: 'paused', progress: 30, lastActivity: '3 weeks ago' },
    { id: '5', name: 'Robert Wilson', email: 'robert@example.com', status: 'active', progress: 80, lastActivity: 'Today' },
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = () => {
    toast.success('Add member modal would open here');
  };

  const handleViewProfile = (memberId: string) => {
    toast.info(`Viewing profile for member ${memberId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Program Members</DialogTitle>
          <DialogDescription>
            Members assigned to "{programName}"
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddMember}>
            <UserPlus className="h-4 w-4 mr-2" /> Add Member
          </Button>
        </div>

        <div className="border rounded-md overflow-hidden">
          {filteredMembers.length > 0 ? (
            <div className="divide-y">
              {filteredMembers.map(member => (
                <div key={member.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-sm text-gray-600 mb-1">Progress</div>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 h-2 flex-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            member.progress >= 80 ? 'bg-green-500' : 
                            member.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${member.progress}%` }}
                        />
                      </div>
                      <span className="text-sm">{member.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
                    <div className="text-sm text-gray-500">Last activity: {member.lastActivity}</div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewProfile(member.id)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No members found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramMembersDialog;
