
import { ClassType, MemberInfo } from '@/types/classTypes';
import { toast } from 'sonner';

interface UseBookingActionsProps {
  classes: ClassType[];
  setClasses: React.Dispatch<React.SetStateAction<ClassType[]>>;
  notificationsEnabled: boolean;
  sendNotification: (message: string, recipient?: string) => void;
}

export const useBookingActions = ({ 
  classes, 
  setClasses, 
  notificationsEnabled, 
  sendNotification 
}: UseBookingActionsProps) => {
  
  const bookClass = (classId: number, member: MemberInfo) => {
    setClasses(prevClasses => 
      prevClasses.map(c => {
        if (c.id === classId) {
          // Check if class is full
          if (c.enrolled >= c.capacity) {
            // Add to waitlist
            return {
              ...c,
              waitlist: c.waitlist + 1,
              waitlistMembers: [...c.waitlistMembers, member]
            };
          } else {
            // Add to enrolled
            const updatedEnrolled = c.enrolled + 1;
            const updatedStatus = updatedEnrolled >= c.capacity ? 'full' : c.status;
            
            return {
              ...c,
              enrolled: updatedEnrolled,
              enrolledMembers: [...c.enrolledMembers, member],
              status: updatedStatus
            };
          }
        }
        return c;
      })
    );
    
    const classInfo = classes.find(c => c.id === classId);
    if (classInfo) {
      if (classInfo.enrolled >= classInfo.capacity) {
        toast.info(`Added to waitlist for ${classInfo.name}`);
      } else {
        toast.success(`Successfully booked ${classInfo.name}`);
      }
    }
  };

  const cancelBooking = (classId: number, memberId: number) => {
    setClasses(prevClasses => 
      prevClasses.map(c => {
        if (c.id === classId) {
          // Check if member is in waitlist
          const inWaitlist = c.waitlistMembers.some(m => m.id === memberId);
          
          if (inWaitlist) {
            return {
              ...c,
              waitlist: c.waitlist - 1,
              waitlistMembers: c.waitlistMembers.filter(m => m.id !== memberId)
            };
          } else {
            // Remove from enrolled
            const updatedEnrolled = c.enrolled - 1;
            const updatedStatus = updatedEnrolled < c.capacity ? 'scheduled' : c.status;
            
            // If there are people on waitlist, move one to enrolled
            let updatedWaitlist = c.waitlist;
            let updatedWaitlistMembers = [...c.waitlistMembers];
            let updatedEnrolledMembers = c.enrolledMembers.filter(m => m.id !== memberId);
            
            if (c.waitlist > 0) {
              const memberToMove = updatedWaitlistMembers[0];
              updatedWaitlist -= 1;
              updatedWaitlistMembers = updatedWaitlistMembers.slice(1);
              updatedEnrolledMembers = [...updatedEnrolledMembers, memberToMove];
              
              // Notify the member who got moved from waitlist
              if (notificationsEnabled) {
                sendNotification(
                  `You've been moved from the waitlist to enrolled for ${c.name}`,
                  memberToMove.email
                );
              }
            }
            
            return {
              ...c,
              enrolled: updatedEnrolled < 0 ? 0 : updatedEnrolled,
              enrolledMembers: updatedEnrolledMembers,
              waitlist: updatedWaitlist,
              waitlistMembers: updatedWaitlistMembers,
              status: updatedStatus
            };
          }
        }
        return c;
      })
    );
    
    const classInfo = classes.find(c => c.id === classId);
    if (classInfo) {
      toast.success(`Successfully canceled booking for ${classInfo.name}`);
    }
  };

  return {
    bookClass,
    cancelBooking
  };
};
