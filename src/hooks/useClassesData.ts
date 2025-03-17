
import { useState, useEffect } from 'react';
import { ClassType } from '@/types/classTypes';
import { mockClasses } from '@/data/mockClassesData';
import { useClassActions } from './classes/useClassActions';
import { useClassFilters } from './classes/useClassFilters';
import { useNotifications } from './classes/useNotifications';

export * from '@/types/classTypes';

export const useClassesData = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    classes,
    setClasses,
    addClass,
    updateClass,
    deleteClass,
    bookClass,
    cancelBooking,
    notificationsEnabled,
    toggleNotifications
  } = useClassActions([]);

  const {
    filteredClasses,
    filterType,
    setFilterType,
    filterClasses
  } = useClassFilters(classes);

  useEffect(() => {
    // Simulate API fetch
    const loadClasses = () => {
      setIsLoading(true);
      setTimeout(() => {
        setClasses(mockClasses);
        setIsLoading(false);
      }, 500);
    };

    loadClasses();
  }, []);

  return {
    classes,
    filteredClasses,
    filterType,
    isLoading,
    addClass,
    updateClass,
    deleteClass,
    filterClasses,
    setFilterType,
    bookClass,
    cancelBooking,
    toggleNotifications,
    notificationsEnabled,
    sendNotification: useNotifications().sendNotification
  };
};
