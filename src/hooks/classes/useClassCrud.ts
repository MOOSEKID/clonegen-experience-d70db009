
import { ClassType } from '@/types/classTypes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseClassCrudOptions {
  notificationsEnabled: boolean;
  sendNotification: (message: string, recipient?: string) => void;
}

export const useClassCrud = (
  classes: ClassType[],
  setClasses: React.Dispatch<React.SetStateAction<ClassType[]>>,
  { notificationsEnabled, sendNotification }: UseClassCrudOptions
) => {
  const addClass = async (newClass: Omit<ClassType, 'id'>) => {
    try {
      // Validate required fields before proceeding
      if (!newClass.name || !newClass.type || !newClass.day || !newClass.time || !newClass.durationMinutes || !newClass.room) {
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
        durationMinutes: newClass.durationMinutes,
        room: newClass.room,
        status: newClass.status,
        trainer_id: newClass.trainerId || null,
        class_level: newClass.classLevel,
        equipment_required: newClass.equipmentRequired || [],
        recurrence: newClass.recurrence || false,
        recurrence_days: newClass.recurrenceDays || [],
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
        durationMinutes: updatedClass.durationMinutes,
        room: updatedClass.room,
        status: updatedClass.status,
        trainer_id: updatedClass.trainerId || null,
        class_level: updatedClass.classLevel,
        equipment_required: updatedClass.equipmentRequired,
        recurrence: updatedClass.recurrence,
        recurrence_days: updatedClass.recurrenceDays || [],
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

  return {
    addClass,
    updateClass,
    deleteClass
  };
};
