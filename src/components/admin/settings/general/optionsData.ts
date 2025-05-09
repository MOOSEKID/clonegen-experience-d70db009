
export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'sw', name: 'Swahili' },
];

export const currencies = [
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
];

export const timezones = [
  { value: 'Africa/Kigali', label: 'Kigali (GMT+2)' },
  { value: 'Africa/Nairobi', label: 'Nairobi (GMT+3)' },
  { value: 'Africa/Lagos', label: 'Lagos (GMT+1)' },
  { value: 'Africa/Cairo', label: 'Cairo (GMT+2)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (GMT+2)' },
  { value: 'Europe/London', label: 'London (GMT+0/+1)' },
  { value: 'Europe/Paris', label: 'Paris (GMT+1/+2)' },
  { value: 'America/New_York', label: 'New York (GMT-5/-4)' },
  { value: 'Asia/Dubai', label: 'Dubai (GMT+4)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
];

// Rwandan phone number validation
export const isValidRwandanPhone = (phone: string): boolean => {
  // Accept formats: +250xxxxxxxxx, 250xxxxxxxxx, or 07xxxxxxxx
  const rwandanPhoneRegex = /^(?:\+250|250)?7[238]\d{7}$/;
  return rwandanPhoneRegex.test(phone.replace(/\s/g, ''));
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
