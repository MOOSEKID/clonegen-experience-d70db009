
import { ClassType } from '@/types/classTypes';

export const getDefaultClassData = (): Omit<ClassType, 'id'> => ({
  name: '',
  description: '',
  type: 'yoga',
  trainer: '',
  trainerId: '',
  capacity: 20,
  enrolled: 0,
  waitlist: 0,
  day: 'Monday',
  time: '08:00',
  durationMinutes: 60,
  room: '',
  status: 'scheduled',
  enrolledMembers: [],
  waitlistMembers: [],
  classLevel: 'Beginner',
  equipmentRequired: ['yoga_mat'],
  recurrence: false,
  recurrenceDays: [],
  classFees: null,
  feeType: null
});

export const equipmentOptions = [
  { value: 'yoga_mat', label: 'Yoga Mat' },
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'kettlebells', label: 'Kettlebells' },
  { value: 'resistance_bands', label: 'Resistance Bands' },
  { value: 'boxing_gloves', label: 'Boxing Gloves' },
  { value: 'jump_rope', label: 'Jump Rope' },
  { value: 'foam_roller', label: 'Foam Roller' },
  { value: 'exercise_bike', label: 'Exercise Bike' },
  { value: 'treadmill', label: 'Treadmill' },
  { value: 'rowing_machine', label: 'Rowing Machine' },
  { value: 'none', label: 'No Equipment Required' }
];

export const weekDays = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
];

export const isEveryDay = (days: string[]): boolean => {
  return days.length === 7;
};

export const toggleDay = (days: string[], day: string): string[] => {
  if (days.includes(day)) {
    return days.filter(d => d !== day);
  } else {
    return [...days, day];
  }
};

export const toggleEveryDay = (days: string[]): string[] => {
  if (isEveryDay(days)) {
    return [];
  } else {
    return weekDays.map(day => day.value);
  }
};
