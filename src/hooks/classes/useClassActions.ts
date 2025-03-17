
import { useState } from 'react';
import { ClassType } from '@/types/classTypes';
import { useClassCrud } from './useClassCrud';
import { useBookingManagement } from './useBookingManagement';
import { useNotifications } from './useNotifications';

export const useClassActions = (initialClasses: ClassType[] = []) => {
  const [classes, setClasses] = useState<ClassType[]>(initialClasses);
  const { notificationsEnabled, toggleNotifications, sendNotification } = useNotifications();
  
  const { addClass, updateClass, deleteClass } = useClassCrud(classes, setClasses, {
    notificationsEnabled,
    sendNotification
  });
  
  const { bookClass, cancelBooking } = useBookingManagement(classes, setClasses, {
    notificationsEnabled,
    sendNotification
  });

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
