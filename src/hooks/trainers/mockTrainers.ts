
import { StaffProfile } from './types';

export const getMockTrainers = (): StaffProfile[] => {
  return [
    {
      id: '1',
      full_name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      bio: 'Professional fitness trainer with over 10 years of experience.',
      photo_url: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'trainer',
      specialties: ['Strength', 'Cardio', 'Nutrition'],
      status: 'Active',
      hire_date: '2018-03-15',
      certifications: [],
      availability: [],
      assigned_classes: [],
      assigned_members: [],
      created_at: null,
      updated_at: null,
      experience_years: 10,
      experience_level: 'Expert'
    },
    {
      id: '2',
      full_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      bio: 'Specialized in yoga and flexibility training.',
      photo_url: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'trainer',
      specialties: ['Yoga', 'Pilates', 'Flexibility'],
      status: 'Active',
      hire_date: '2019-06-22',
      certifications: [],
      availability: [],
      assigned_classes: [],
      assigned_members: [],
      created_at: null,
      updated_at: null,
      experience_years: 5,
      experience_level: 'Intermediate'
    },
    {
      id: '3',
      full_name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1122334455',
      bio: 'Focused on athletic performance and sports-specific training.',
      photo_url: 'https://randomuser.me/api/portraits/men/67.jpg',
      role: 'trainer',
      specialties: ['Sports', 'Performance', 'Rehabilitation'],
      status: 'On Leave',
      hire_date: '2020-01-10',
      certifications: [],
      availability: [],
      assigned_classes: [],
      assigned_members: [],
      created_at: null,
      updated_at: null,
      experience_years: 3,
      experience_level: 'Advanced'
    }
  ];
};

export default getMockTrainers;
