
// Common trainer specializations
export const commonSpecializations = [
  'Strength & Conditioning',
  'Weight Loss',
  'Functional Training',
  'Nutrition',
  'Bodybuilding',
  'CrossFit',
  'Rehabilitation',
  'Sports Performance',
  'Olympic Weightlifting',
  'HIIT',
  'Cardio',
  'Group Fitness',
  'Yoga',
  'Pilates',
  'Boxing',
  'Martial Arts',
  'Senior Fitness',
  'Youth Training',
  'Post-Natal Fitness',
  'Mobility',
  'Core Training'
];

// Map role to color for UI elements
export const getRoleColor = (role: string): string => {
  const roleColors = {
    trainer: 'green',
    manager: 'blue',
    reception: 'amber',
    sales: 'orange',
    support: 'purple'
  };
  
  return roleColors[role] || 'gray';
};

// Get display label for role with proper capitalization
export const getRoleLabel = (role: string): string => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

// Format availability for display
export const formatAvailabilityTime = (timeString: string): string => {
  try {
    if (!timeString) return '';
    
    if (timeString.includes('T')) {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  } catch (e) {
    return timeString;
  }
};
