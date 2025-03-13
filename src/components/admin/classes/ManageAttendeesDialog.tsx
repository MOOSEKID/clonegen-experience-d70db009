
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, User, Users } from 'lucide-react';
import { ClassType, MemberInfo } from '@/types/classTypes';
import MemberList from './attendees/MemberList';
import ClassInfoHeader from './attendees/ClassInfoHeader';
import { getAvailableMembers } from '@/services/memberService';

interface ManageAttendeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: ClassType;
  onBookClass: (classId: number, member: MemberInfo) => void;
  onCancelBooking: (classId: number, memberId: string) => void;
}

const ManageAttendeesDialog = ({ 
  open, 
  onOpenChange, 
  classData, 
  onBookClass, 
  onCancelBooking 
}: ManageAttendeesDialogProps) => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableMembers, setAvailableMembers] = useState<MemberInfo[]>([]);

  // Fetch available members when dialog opens or search term changes
  useEffect(() => {
    if (open) {
      const fetchMembers = async () => {
        const members = await getAvailableMembers(
          classData.enrolledMembers,
          classData.waitlistMembers,
          searchTerm
        );
        setAvailableMembers(members);
      };
      
      fetchMembers();
    }
  }, [open, searchTerm, classData.enrolledMembers, classData.waitlistMembers]);

  const handleAddMember = (member: MemberInfo) => {
    onBookClass(classData.id, member);
  };

  const handleRemoveMember = (memberId: string) => {
    onCancelBooking(classData.id, memberId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage Class Attendees
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <ClassInfoHeader classData={classData} />
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search members..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="enrolled" className="flex gap-2">
                <User size={16} />
                Enrolled ({classData.enrolledMembers.length})
              </TabsTrigger>
              <TabsTrigger value="waitlist" className="flex gap-2">
                <User size={16} />
                Waitlist ({classData.waitlistMembers.length})
              </TabsTrigger>
              <TabsTrigger value="add" className="flex gap-2">
                <UserPlus size={16} />
                Add Members
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="enrolled">
              <MemberList
                members={classData.enrolledMembers}
                action="remove"
                onAction={handleRemoveMember}
                emptyMessage="No members enrolled in this class yet."
                searchTerm={searchTerm}
              />
            </TabsContent>
            
            <TabsContent value="waitlist">
              <MemberList
                members={classData.waitlistMembers}
                action="remove"
                onAction={handleRemoveMember}
                emptyMessage="No members on the waitlist."
                searchTerm={searchTerm}
                isWaitlist
              />
            </TabsContent>
            
            <TabsContent value="add">
              {availableMembers.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  {searchTerm 
                    ? "No matching members found." 
                    : "All members are already enrolled or on the waitlist."}
                </div>
              ) : (
                <MemberList
                  members={availableMembers}
                  action="add"
                  onAction={(memberId) => {
                    const member = availableMembers.find(m => m.id === memberId);
                    if (member) handleAddMember(member);
                  }}
                  emptyMessage="No available members found."
                  searchTerm=""
                  classIsFull={classData.enrolled >= classData.capacity}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAttendeesDialog;
