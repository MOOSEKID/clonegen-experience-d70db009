
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Member } from '@/types/memberTypes';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Info, 
  UserCheck
} from 'lucide-react';

interface MemberProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member;
}

const MemberProfileDialog = ({ isOpen, onClose, member }: MemberProfileDialogProps) => {
  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days remaining in membership
  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return 'N/A';
    
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? `${diffDays} days` : 'Expired';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Member Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 py-4">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={member.profilePicture} />
                <AvatarFallback className="text-2xl">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-1">{member.name}</h2>
              <div className="text-sm text-gray-500 mb-2">{member.email}</div>
              <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.status === 'Active' ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {member.status}
                </span>
              </div>
              
              <div className="w-full space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{member.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{`${member.membershipType} (${member.membershipPlan || 'Standard'})`}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Joined: {formatDate(member.startDate)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator orientation="vertical" className="hidden md:block" />
          
          <div className="md:w-2/3">
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="classes" className="flex-1">Classes</TabsTrigger>
                <TabsTrigger value="payments" className="flex-1">Payments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Membership Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Membership Type</div>
                      <div className="text-sm font-medium">{member.membershipType}</div>
                      
                      <div className="text-sm text-gray-500">Membership Plan</div>
                      <div className="text-sm font-medium">{member.membershipPlan || 'Standard'}</div>
                      
                      <div className="text-sm text-gray-500">Start Date</div>
                      <div className="text-sm font-medium">{formatDate(member.startDate)}</div>
                      
                      <div className="text-sm text-gray-500">End Date</div>
                      <div className="text-sm font-medium">{formatDate(member.endDate)}</div>
                      
                      <div className="text-sm text-gray-500">Days Remaining</div>
                      <div className="text-sm font-medium">{getDaysRemaining(member.endDate)}</div>
                      
                      <div className="text-sm text-gray-500">Last Check-in</div>
                      <div className="text-sm font-medium">{formatDate(member.lastCheckin)}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Date of Birth</div>
                      <div className="text-sm font-medium">{formatDate(member.dateOfBirth)}</div>
                      
                      <div className="text-sm text-gray-500">Gender</div>
                      <div className="text-sm font-medium">{member.gender || 'Not specified'}</div>
                      
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="text-sm font-medium">{member.address || 'Not provided'}</div>
                      
                      <div className="text-sm text-gray-500">Emergency Contact</div>
                      <div className="text-sm font-medium">{member.emergencyContact || 'Not provided'}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Fitness Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-gray-500">Workout Goals</div>
                      <div className="text-sm font-medium">{member.workoutGoals || 'Not specified'}</div>
                      
                      <div className="text-sm text-gray-500">Medical Conditions</div>
                      <div className="text-sm font-medium">{member.medicalConditions || 'None specified'}</div>
                      
                      <div className="text-sm text-gray-500">Preferred Workout Time</div>
                      <div className="text-sm font-medium">
                        {member.preferredWorkoutTime && member.preferredWorkoutTime.length > 0 
                          ? member.preferredWorkoutTime.join(', ') 
                          : 'No preference'}
                      </div>
                      
                      <div className="text-sm text-gray-500">Trainer Assigned</div>
                      <div className="text-sm font-medium">{member.trainerAssigned || 'None assigned'}</div>
                    </div>
                  </CardContent>
                </Card>
                
                {member.notes && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{member.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="classes" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Enrollments</CardTitle>
                    <CardDescription>Classes this member is enrolled in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <Info className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No Classes Found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        This member is not currently enrolled in any classes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payments" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Record of payments made by this member</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6">
                      <Info className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium">No Payment Records</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        No payment records found for this member.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>
            <UserCheck className="w-4 h-4 mr-2" />
            Edit Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberProfileDialog;
