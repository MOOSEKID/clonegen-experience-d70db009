
import { useState } from 'react';
import { ClassType, MemberInfo } from '@/types/classTypes';
import { toast } from 'sonner';

interface UseClassManagementProps {
  notificationsEnabled: boolean;
  sendNotification: (message: string, recipient?: string) => void;
}

export const useClassManagement = ({ notificationsEnabled, sendNotification }: UseClassManagementProps) => {
  const [classes, setClasses] = useState<ClassType[]>([]);

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

  return {
    classes,
    setClasses,
    addClass,
    updateClass,
    deleteClass
  };
};
