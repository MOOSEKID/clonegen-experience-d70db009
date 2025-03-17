
import { ClassType, MemberInfo } from '@/types/classTypes';

interface UseBookingManagementOptions {
  notificationsEnabled: boolean;
  sendNotification: (message: string, recipient?: string) => void;
}

export const useBookingManagement = (
  classes: ClassType[],
  setClasses: React.Dispatch<React.SetStateAction<ClassType[]>>,
  { notificationsEnabled, sendNotification }: UseBookingManagementOptions
) => {
  const bookClass = (classId: number, member: MemberInfo) => {
    setClasses(prevClasses => {
      return prevClasses.map(c => {
        if (c.id === classId) {
          // If class is not full, add to enrolled members
          if (c.enrolled < c.capacity) {
            return {
              ...c,
              enrolled: c.enrolled + 1,
              enrolledMembers: [...c.enrolledMembers, member],
              status: c.enrolled + 1 >= c.capacity ? 'full' : c.status
            };
          } 
          // If class is full, add to waitlist
          else {
            return {
              ...c,
              waitlist: c.waitlist + 1,
              waitlistMembers: [...c.waitlistMembers, member]
            };
          }
        }
        return c;
      });
    });
    
    if (notificationsEnabled) {
      sendNotification(`New booking: ${member.name} has booked a class`, member.email);
    }
  };

  const cancelBooking = (classId: number, memberId: string) => {
    setClasses(prevClasses => {
      return prevClasses.map(c => {
        if (c.id === classId) {
          // Check if member is in enrolled list
          const memberIndex = c.enrolledMembers.findIndex(m => m.id === memberId);
          
          if (memberIndex >= 0) {
            // Remove from enrolled
            const updatedEnrolled = [...c.enrolledMembers];
            const removedMember = updatedEnrolled.splice(memberIndex, 1)[0];
            
            // If there's a waitlist, move the first person from waitlist to enrolled
            let updatedWaitlist = [...c.waitlistMembers];
            let newEnrolled = c.enrolled - 1;
            let newWaitlist = c.waitlist;
            
            if (updatedWaitlist.length > 0) {
              const promotedMember = updatedWaitlist.shift();
              if (promotedMember) {
                updatedEnrolled.push(promotedMember);
                newEnrolled = c.enrolled; // Stays the same as we removed 1 and added 1
                newWaitlist = c.waitlist - 1;
                
                if (notificationsEnabled) {
                  sendNotification(
                    `You've been moved from the waitlist to enrolled for ${c.name}`, 
                    promotedMember.email
                  );
                }
              }
            }
            
            return {
              ...c,
              enrolled: newEnrolled,
              waitlist: newWaitlist,
              enrolledMembers: updatedEnrolled,
              waitlistMembers: updatedWaitlist,
              status: newEnrolled < c.capacity ? (c.status === 'full' ? 'open' : c.status) : c.status
            };
          } 
          // Check if member is in waitlist
          else {
            const waitlistIndex = c.waitlistMembers.findIndex(m => m.id === memberId);
            
            if (waitlistIndex >= 0) {
              // Remove from waitlist
              const updatedWaitlist = [...c.waitlistMembers];
              updatedWaitlist.splice(waitlistIndex, 1);
              
              return {
                ...c,
                waitlist: c.waitlist - 1,
                waitlistMembers: updatedWaitlist
              };
            }
          }
        }
        return c;
      });
    });
  };

  return {
    bookClass,
    cancelBooking
  };
};
