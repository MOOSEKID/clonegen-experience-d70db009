
/**
 * Array of weekdays for availability selection
 */
export const weekDays = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" }
];

/**
 * Equipment options for class requirements
 */
export const equipmentOptions = [
  { value: "none", label: "None Required" },
  { value: "yoga_mat", label: "Yoga Mat" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "kettlebells", label: "Kettlebells" },
  { value: "resistance_bands", label: "Resistance Bands" },
  { value: "exercise_ball", label: "Exercise Ball" },
  { value: "foam_roller", label: "Foam Roller" },
  { value: "jump_rope", label: "Jump Rope" },
  { value: "barbell", label: "Barbell" },
  { value: "rowing_machine", label: "Rowing Machine" },
  { value: "treadmill", label: "Treadmill" },
  { value: "bicycle", label: "Bicycle" }
];

/**
 * Returns default class data for initializing new class forms
 */
export const getDefaultClassData = () => ({
  name: '',
  description: '',
  type: 'yoga' as const,
  trainer: '',
  trainerId: '',
  capacity: 20,
  enrolled: 0,
  enrolledMembers: [],
  waitlist: 0,
  waitlistMembers: [],
  day: '',
  time: '',
  duration: 60,
  room: '',
  status: 'scheduled' as const,
  classLevel: 'Beginner' as const,
  equipmentRequired: ['none'],
  recurrence: false,
  recurrenceDays: [],
  classFees: null,
  feeType: null
});

/**
 * Check if all weekdays are selected
 */
export const isEveryDay = (selectedDays: string[]): boolean => {
  return selectedDays.length === weekDays.length;
};

/**
 * Toggle a day in the selected days array
 */
export const toggleDay = (selectedDays: string[], day: string): string[] => {
  return selectedDays.includes(day)
    ? selectedDays.filter(d => d !== day)
    : [...selectedDays, day];
};

/**
 * Toggle all days selection
 */
export const toggleEveryDay = (selectedDays: string[]): string[] => {
  return isEveryDay(selectedDays)
    ? []
    : weekDays.map(day => day.value);
};
