import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface MemberInfo {
  id: number;
  name: string;
  email: string;
}

export interface ClassType {
  id: number;
  name: string;
  description: string;
  type: 'yoga' | 'hiit' | 'strength' | 'cardio' | 'pilates' | 'other';
  trainer: string;
  capacity: number;
  enrolled: number;
  enrolledMembers: MemberInfo[];
  waitlist: number;
  waitlistMembers: MemberInfo[];
  day: string;
  time: string;
  duration: number;
  room: string;
  status: 'scheduled' | 'canceled' | 'full';
}

const mockMembers: MemberInfo[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
  { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com' },
  { id: 5, name: 'Robert Wilson', email: 'robert.wilson@example.com' },
];

const mockClasses: ClassType[] = [
  {
    id: 1,
    name: 'Morning Yoga',
    description: 'Start your day with a relaxing yoga session',
    type: 'yoga',
    trainer: 'Sarah Johnson',
    capacity: 20,
    enrolled: 15,
    enrolledMembers: mockMembers.slice(0, 3),
    waitlist: 0,
    waitlistMembers: [],
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
    enrolledMembers: mockMembers.slice(1, 4),
    waitlist: 2,
    waitlistMembers: mockMembers.slice(4, 5),
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
    enrolledMembers: mockMembers.slice(0, 2),
    waitlist: 0,
    waitlistMembers: [],
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
    enrolledMembers: mockMembers.slice(2, 5),
    waitlist: 0,
    waitlistMembers: [],
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
    enrolledMembers: mockMembers.slice(1, 3),
    waitlist: 0,
    waitlistMembers: [],
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
    enrolledMembers: mockMembers.slice(0, 4),
    waitlist: 0,
    waitlistMembers: [],
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
    enrolledMembers: mockMembers.slice(2, 3),
    waitlist: 0,
    waitlistMembers: [],
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
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

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
    sendNotification
  };
};
