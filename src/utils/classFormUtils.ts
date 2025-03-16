
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
  { value: 'none', label: 'No Equipment' },
  { value: 'yoga_mat', label: 'Yoga Mat' },
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'resistance_bands', label: 'Resistance Bands' },
  { value: 'kettlebells', label: 'Kettlebells' },
  { value: 'jump_rope', label: 'Jump Rope' },
  { value: 'boxing_gloves', label: 'Boxing Gloves' },
  { value: 'exercise_ball', label: 'Exercise Ball' },
  { value: 'foam_roller', label: 'Foam Roller' },
  { value: 'medicine_ball', label: 'Medicine Ball' },
  { value: 'pull_up_bar', label: 'Pull-up Bar' },
  { value: 'step_platform', label: 'Step Platform' }
];

/**
 * Check if all days of the week are selected
 */
export const isEveryDay = (selectedDays: string[]): boolean => {
  return selectedDays.length === 7;
};

/**
 * Toggle a day in the selection array
 */
export const toggleDay = (selectedDays: string[], day: string): string[] => {
  if (selectedDays.includes(day)) {
    return selectedDays.filter(d => d !== day);
  } else {
    return [...selectedDays, day];
  }
};

/**
 * Toggle between selecting all days or clearing selection
 */
export const toggleEveryDay = (selectedDays: string[]): string[] => {
  if (isEveryDay(selectedDays)) {
    return [];
  } else {
    return weekDays.map(day => day.value);
  }
};

/**
 * Get default class data for new class creation
 */
export const getDefaultClassData = () => {
  return {
    name: '',
    description: '',
    type: 'other' as const,
    trainer: '',
    trainerId: '',
    capacity: 15,
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
  };
};
