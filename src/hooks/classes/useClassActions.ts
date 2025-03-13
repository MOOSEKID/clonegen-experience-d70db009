
import { ClassType, MemberInfo } from '@/types/classTypes';
import { useClassManagement } from './useClassManagement';
import { useBookingActions } from './useBookingActions';
import { useNotifications } from './useNotifications';

export const useClassActions = (initialClasses: ClassType[]) => {
  const { notificationsEnabled, sendNotification } = useNotifications();
  
  const { 
    classes, 
    setClasses, 
    addClass, 
    updateClass, 
    deleteClass 
  } = useClassManagement({ 
    notificationsEnabled, 
    sendNotification 
  });
  
  const { bookClass, cancelBooking } = useBookingActions({ 
    classes, 
    setClasses, 
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
    notificationsEnabled
  };
};
