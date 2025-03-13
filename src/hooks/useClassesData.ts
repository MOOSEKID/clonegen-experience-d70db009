
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface ClassType {
  id: number;
  name: string;
  description: string;
  type: 'yoga' | 'hiit' | 'strength' | 'cardio' | 'pilates' | 'other';
  trainer: string;
  capacity: number;
  enrolled: number;
  waitlist: number;
  day: string;
  time: string;
  duration: number;
  room: string;
  status: 'scheduled' | 'canceled' | 'full';
}

const mockClasses: ClassType[] = [
  {
    id: 1,
    name: 'Morning Yoga',
    description: 'Start your day with a relaxing yoga session',
    type: 'yoga',
    trainer: 'Sarah Johnson',
    capacity: 20,
    enrolled: 15,
    waitlist: 0,
    day: 'Monday',
    time: '08:00',
    duration: 60,
    room: 'Studio 1',
    status: 'scheduled'
  },
  {
    id: 2,
    name: 'HIIT Blast',
    description: 'High-intensity interval training to burn calories',
    type: 'hiit',
    trainer: 'Mike Davis',
    capacity: 15,
    enrolled: 15,
    waitlist: 2,
    day: 'Tuesday',
    time: '17:30',
    duration: 45,
    room: 'Training Area',
    status: 'full'
  },
  {
    id: 3,
    name: 'Strength Fundamentals',
    description: 'Build strength with guided weightlifting',
    type: 'strength',
    trainer: 'Chris Wilson',
    capacity: 12,
    enrolled: 10,
    waitlist: 0,
    day: 'Wednesday',
    time: '19:00',
    duration: 60,
    room: 'Weights Room',
    status: 'scheduled'
  },
  {
    id: 4,
    name: 'Cardio Dance',
    description: 'Fun dance workout to get your heart pumping',
    type: 'cardio',
    trainer: 'Emma Rodriguez',
    capacity: 25,
    enrolled: 20,
    waitlist: 0,
    day: 'Thursday',
    time: '18:00',
    duration: 60,
    room: 'Studio 2',
    status: 'scheduled'
  },
  {
    id: 5,
    name: 'Pilates Core',
    description: 'Focus on core strength and flexibility',
    type: 'pilates',
    trainer: 'Jennifer Lee',
    capacity: 15,
    enrolled: 8,
    waitlist: 0,
    day: 'Friday',
    time: '12:00',
    duration: 45,
    room: 'Studio 1',
    status: 'scheduled'
  },
  {
    id: 6,
    name: 'Weekend Yoga Flow',
    description: 'Relaxing yoga session to end your week',
    type: 'yoga',
    trainer: 'Sarah Johnson',
    capacity: 20,
    enrolled: 18,
    waitlist: 0,
    day: 'Saturday',
    time: '10:00',
    duration: 60,
    room: 'Studio 1',
    status: 'scheduled'
  },
  {
    id: 7,
    name: 'Advanced HIIT',
    description: 'Challenging high-intensity workout for experienced members',
    type: 'hiit',
    trainer: 'Mike Davis',
    capacity: 12,
    enrolled: 5,
    waitlist: 0,
    day: 'Monday',
    time: '19:30',
    duration: 45,
    room: 'Training Area',
    status: 'scheduled'
  },
];

export const useClassesData = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filteredClasses, setFilteredClasses] = useState<ClassType[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const loadClasses = () => {
      setIsLoading(true);
      setTimeout(() => {
        setClasses(mockClasses);
        setFilteredClasses(mockClasses);
        setIsLoading(false);
      }, 500);
    };

    loadClasses();
  }, []);

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

  const addClass = (newClass: Omit<ClassType, 'id'>) => {
    const newId = Math.max(...classes.map(c => c.id), 0) + 1;
    const classWithId = {
      ...newClass,
      id: newId
    };
    
    setClasses(prevClasses => [...prevClasses, classWithId]);
    toast.success(`${newClass.name} class added successfully!`);
    return classWithId;
  };

  const updateClass = (updatedClass: ClassType) => {
    setClasses(prevClasses => 
      prevClasses.map(c => c.id === updatedClass.id ? updatedClass : c)
    );
    toast.success(`${updatedClass.name} updated successfully!`);
  };

  const deleteClass = (classId: number) => {
    const classToDelete = classes.find(c => c.id === classId);
    setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
    if (classToDelete) {
      toast.success(`${classToDelete.name} deleted successfully!`);
    }
  };

  return {
    classes,
    filteredClasses,
    filterType,
    isLoading,
    addClass,
    updateClass,
    deleteClass,
    filterClasses,
    setFilterType
  };
};
