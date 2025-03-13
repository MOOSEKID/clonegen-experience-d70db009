
import { useState, useEffect } from 'react';
import { ClassType } from '@/types/classTypes';

export const useClassFilters = (classes: ClassType[]) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filteredClasses, setFilteredClasses] = useState<ClassType[]>(classes);

  useEffect(() => {
    filterClasses(filterType);
  }, [filterType, classes]);

  const filterClasses = (filter: string) => {
    if (filter === 'all') {
      setFilteredClasses(classes);
    } else if (filter === 'full') {
      setFilteredClasses(classes.filter(c => c.status === 'full'));
    } else if (filter === 'available') {
      setFilteredClasses(classes.filter(c => c.enrolled < c.capacity));
    } else if (filter === 'waitlist') {
      setFilteredClasses(classes.filter(c => c.waitlist > 0));
    } else {
      setFilteredClasses(classes.filter(c => c.type === filter));
    }
  };

  return {
    filteredClasses,
    filterType,
    setFilterType,
    filterClasses
  };
};
