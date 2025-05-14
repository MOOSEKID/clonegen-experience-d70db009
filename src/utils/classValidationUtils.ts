
import { ClassType } from '@/types/classTypes';

export const validateClassForm = (formData: ClassType | null): Record<string, string> => {
  if (!formData) return {};
  
  const errors: Record<string, string> = {};
  
  // Required fields
  if (!formData.name.trim()) {
    errors.name = 'Class name is required';
  }
  
  if (!formData.trainer && !formData.trainerId) {
    errors.trainer = 'Trainer is required';
  }
  
  if (!formData.day) {
    errors.day = 'Day is required';
  }
  
  if (!formData.time) {
    errors.time = 'Start time is required';
  }
  
  if (!formData.room) {
    errors.room = 'Room is required';
  }
  
  // Numeric validations
  if (formData.capacity <= 0) {
    errors.capacity = 'Capacity must be at least 1';
  }
  
  if (formData.durationMinutes <= 0) {
    errors.durationMinutes = 'Duration must be at least 1 minute';
  }
  
  // Fee validations
  if (formData.classFees !== null) {
    if (formData.classFees < 0) {
      errors.classFees = 'Fee cannot be negative';
    }
    
    if (!formData.feeType) {
      errors.feeType = 'Fee type is required when fee is specified';
    }
  }
  
  // Recurrence validations
  if (formData.recurrence && formData.recurrenceDays.length === 0) {
    errors.recurrenceDays = 'Please select at least one day for recurring classes';
  }
  
  return errors;
};
