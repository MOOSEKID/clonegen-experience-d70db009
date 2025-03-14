import { useState } from 'react';
import { ClassType, MemberInfo } from '@/types/classTypes';
import { useNotifications } from './useNotifications';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseClassActionsProps {
  initialClasses: ClassType[];
  notificationsEnabled: boolean;
  sendNotification: (message: string, recipient?: string) => void;
}

export const useClassActions = (initialClasses: ClassType[] = []) => {
  const [classes, setClasses] = useState<ClassType[]>(initialClasses);
  const { 
    notificationsEnabled, 
    toggleNotifications, 
    sendNotification 
  } = useNotifications();
  
  const addClass = async (newClass: Omit<ClassType, 'id'>) => {
    try {
      // Validate required fields before proceeding
      if (!newClass.name || !newClass.type || !newClass.day || !newClass.time || !newClass.duration || !newClass.room) {
        throw new Error('Missing required fields');
      }
      
      // Make sure either trainer name or trainerId exists
      if (!newClass.trainer && !newClass.trainerId) {
        throw new Error('Trainer is required');
      }
      
      // Make sure newClass has waitlistMembers and enrolledMembers initialized
      const classToAdd = {
        ...newClass,
        // Make sure these are initialized for a new class
        enrolled: 0,
        waitlist: 0,
        enrolledMembers: [],
        waitlistMembers: []
      };
      
      // Generate a new ID for local state management
      const newId = Math.max(...classes.map(c => c.id || 0), 0) + 1;
      let classWithId = {
        ...classToAdd,
        id: newId
      };
      
      // First try to save to Supabase
      const supabaseData = {
        name: newClass.name,
        description: newClass.description,
        type: newClass.type,
        capacity: newClass.capacity,
        day: newClass.day,
        time: newClass.time,
        duration: newClass.duration,
        room: newClass.room,
        status: newClass.status,
        trainer_id: newClass.trainerId || null,
        class_level: newClass.classLevel,
        equipment_required: newClass.equipmentRequired || [],
        recurrence: newClass.recurrence || false,
        class_fees: newClass.classFees,
        fee_type: newClass.feeType
      };
      
      console.log('Sending data to Supabase:', supabaseData);
      
      const { data, error } = await supabase
        .from('classes')
        .insert(supabaseData)
        .select()
        .single();
        
      if (error) {
        console.error('Error saving class to Supabase:', error);
        throw new Error(`Database error: ${error.message}`);
      } else if (data) {
        // If success, use the returned ID from Supabase
        console.log('Created class in Supabase:', data);
        // Convert the string ID from Supabase to a number for our local state
        classWithId.id = typeof data.id === 'string' ? parseInt(data.id) : data.id;
      }
      
      setClasses(prevClasses => [...prevClasses, classWithId]);
      toast.success(`${newClass.name} class added successfully!`);
      
      if (notificationsEnabled) {
        sendNotification(`New class added: ${newClass.name}`);
      }
      
      return classWithId;
    } catch (error) {
      console.error('Error adding class:', error);
      if (error instanceof Error) {
        toast.error(`Failed to add class: ${error.message}`);
      } else {
        toast.error('Failed to add class due to an unknown error');
      }
      throw error;
    }
  };

  const updateClass = async (updatedClass: ClassType) => {
    try {
      const originalClass = classes.find(c => c.id === updatedClass.id);
      
      if (!originalClass) {
        throw new Error('Class not found');
      }
      
      // First try to update in Supabase
      const supabaseData = {
        name: updatedClass.name,
        description: updatedClass.description,
        type: updatedClass.type,
        capacity: updatedClass.capacity,
        day: updatedClass.day,
        time: updatedClass.time,
        duration: updatedClass.duration,
        room: updatedClass.room,
        status: updatedClass.status,
        trainer_id: updatedClass.trainerId || null,
        class_level: updatedClass.classLevel,
        equipment_required: updatedClass.equipmentRequired,
        recurrence: updatedClass.recurrence,
        class_fees: updatedClass.classFees,
        fee_type: updatedClass.feeType
      };
      
      const { error } = await supabase
        .from('classes')
        .update(supabaseData)
        .eq('id', updatedClass.id.toString());  // Convert to string for Supabase
        
      if (error) {
        console.error('Error updating class in Supabase:', error);
        // Continue with local state management since we're falling back
      }
      
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
    } catch (error) {
      console.error('Error updating class:', error);
      toast.error('Failed to update class');
      throw error;
    }
  };

  const deleteClass = async (classId: number) => {
    try {
      const classToDelete = classes.find(c => c.id === classId);
      
      if (!classToDelete) {
        throw new Error('Class not found');
      }
      
      // First try to delete from Supabase
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId.toString());  // Convert to string for Supabase
        
      if (error) {
        console.error('Error deleting class from Supabase:', error);
        // Continue with local state management since we're falling back
      }
      
      setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
      
      toast.success(`${classToDelete.name} deleted successfully!`);
      
      if (notificationsEnabled) {
        sendNotification(`Class canceled: ${classToDelete.name}`);
      }
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('Failed to delete class');
      throw error;
    }
  };

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
    classes,
    setClasses,
    addClass,
    updateClass,
    deleteClass,
    bookClass,
    cancelBooking,
    notificationsEnabled,
    toggleNotifications
  };
};
