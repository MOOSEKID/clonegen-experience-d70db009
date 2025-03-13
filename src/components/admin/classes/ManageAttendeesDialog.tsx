
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, X, Plus, User, Users } from 'lucide-react';
import { ClassType, MemberInfo } from '@/hooks/useClassesData';
import { Badge } from '@/components/ui/badge';

interface ManageAttendeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: ClassType;
  onBookClass: (classId: number, member: MemberInfo) => void;
  onCancelBooking: (classId: number, memberId: number) => void;
}

// Mock members for demonstration
const allMembers: MemberInfo[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
  { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com' },
  { id: 5, name: 'Robert Wilson', email: 'robert.wilson@example.com' },
  { id: 6, name: 'Jessica Martinez', email: 'jessica.martinez@example.com' },
  { id: 7, name: 'David Thompson', email: 'david.thompson@example.com' },
  { id: 8, name: 'Amanda Lee', email: 'amanda.lee@example.com' },
  { id: 9, name: 'Daniel Clark', email: 'daniel.clark@example.com' },
  { id: 10, name: 'Olivia Miller', email: 'olivia.miller@example.com' },
];

const ManageAttendeesDialog = ({ 
  open, 
  onOpenChange, 
  classData, 
  onBookClass, 
  onCancelBooking 
}: ManageAttendeesDialogProps) => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [searchTerm, setSearchTerm] = useState('');

  // Get members who are not enrolled or waitlisted in this class
  const getAvailableMembers = () => {
    const enrolledIds = new Set(classData.enrolledMembers.map(m => m.id));
    const waitlistIds = new Set(classData.waitlistMembers.map(m => m.id));
    
    return allMembers.filter(member => 
      !enrolledIds.has(member.id) && 
      !waitlistIds.has(member.id) &&
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddMember = (member: MemberInfo) => {
    onBookClass(classData.id, member);
  };

  const handleRemoveMember = (memberId: number) => {
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
          <div className="bg-gray-100 p-3 mb-4 rounded-md">
            <h3 className="font-bold">{classData.name}</h3>
            <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 mt-1">
              <span>{classData.day}, {classData.time}</span>
              <span>Capacity: {classData.enrolled}/{classData.capacity}</span>
              <span>Waitlist: {classData.waitlist}</span>
            </div>
          </div>
          
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
            
            <TabsContent value="enrolled" className="space-y-2 max-h-[300px] overflow-y-auto">
              {classData.enrolledMembers.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No members enrolled in this class yet.
                </div>
              ) : (
                classData.enrolledMembers
                  .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(member => (
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-3 bg-white border rounded-md"
                    >
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X size={16} />
                        <span className="ml-1">Remove</span>
                      </Button>
                    </div>
                  ))
              )}
            </TabsContent>
            
            <TabsContent value="waitlist" className="space-y-2 max-h-[300px] overflow-y-auto">
              {classData.waitlistMembers.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No members on the waitlist.
                </div>
              ) : (
                classData.waitlistMembers
                  .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((member, index) => (
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-3 bg-white border rounded-md"
                    >
                      <div>
                        <div className="font-medium flex items-center">
                          {member.name}
                          <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                            #{index + 1} in line
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <X size={16} />
                        <span className="ml-1">Remove</span>
                      </Button>
                    </div>
                  ))
              )}
            </TabsContent>
            
            <TabsContent value="add" className="space-y-2 max-h-[300px] overflow-y-auto">
              {getAvailableMembers().length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  {searchTerm 
                    ? "No matching members found." 
                    : "All members are already enrolled or on the waitlist."}
                </div>
              ) : (
                getAvailableMembers().map(member => (
                  <div 
                    key={member.id} 
                    className="flex items-center justify-between p-3 bg-white border rounded-md"
                  >
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                      onClick={() => handleAddMember(member)}
                    >
                      <Plus size={16} />
                      <span className="ml-1">{classData.enrolled >= classData.capacity ? 'Add to Waitlist' : 'Enroll'}</span>
                    </Button>
                  </div>
                ))
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
