
import { ClassType } from '@/types/classTypes';

export const getDefaultClassData = (): Omit<ClassType, 'id'> => ({
  name: '',
  description: '',
  type: 'yoga',
  trainer: '',
  capacity: 20,
  enrolled: 0,
  waitlist: 0,
  day: 'Monday',
  time: '08:00',
  duration: 60,
  room: '',
  status: 'scheduled',
  enrolledMembers: [],
  waitlistMembers: []
});
