
import { useState } from 'react';
import { ClassType, MemberInfo } from '@/types/classTypes';
import { toast } from 'sonner';
import { useNotifications } from './useNotifications';

export const useClassActions = (initialClasses: ClassType[]) => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const { notificationsEnabled, sendNotification } = useNotifications();

  const addClass = (newClass: Omit<ClassType, 'id'>) => {
    const newId = Math.max(...classes.map(c => c.id), 0) + 1;
    const classWithId = {
      ...newClass,
      id: newId
    };
    
    setClasses(prevClasses => [...prevClasses, classWithId]);
    toast.success(`${newClass.name} class added successfully!`);
    
    if (notificationsEnabled) {
      sendNotification(`New class added: ${newClass.name}`);
    }
    
    return classWithId;
  };

  const updateClass = (updatedClass: ClassType) => {
    const originalClass = classes.find(c => c.id === updatedClass.id);
    
    setClasses(prevClasses => 
      prevClasses.map(c => c.id === updatedClass.id ? updatedClass : c)
    );
    toast.success(`${updatedClass.name} updated successfully!`);
    
    if (notificationsEnabled && originalClass) {
      // Check for significant changes that would warrant a notification
      if (originalClass.day !== updatedClass.day || 
          originalClass.time !== updatedClass.time ||
          originalClass.trainer !== updatedClass.trainer ||
          originalClass.status !== updatedClass.status) {
        sendNotification(`Class update: ${updatedClass.name} has been modified`);
      }
    }
  };

  const deleteClass = (classId: number) => {
    const classToDelete = classes.find(c => c.id === classId);
    setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
    if (classToDelete) {
      toast.success(`${classToDelete.name} deleted successfully!`);
      
      if (notificationsEnabled) {
        sendNotification(`Class canceled: ${classToDelete.name}`);
      }
    }
  };

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
    classes,
    setClasses,
    addClass,
    updateClass,
    deleteClass,
    bookClass,
    cancelBooking,
    notificationsEnabled
  };
};
