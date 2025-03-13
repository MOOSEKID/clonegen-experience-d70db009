
import { useState } from 'react';
import { toast } from 'sonner';

export const useNotifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
    toast.success(`Email notifications ${notificationsEnabled ? 'disabled' : 'enabled'}`);
    return !notificationsEnabled;
  };

  const sendNotification = (message: string, recipient?: string) => {
    // In a real application, this would connect to an email service
    console.log(`NOTIFICATION: ${message}${recipient ? ` to ${recipient}` : ' to all enrolled members'}`);
    toast.info('Notification sent to members');
  };

  return {
    notificationsEnabled,
    toggleNotifications,
    sendNotification
  };
};
