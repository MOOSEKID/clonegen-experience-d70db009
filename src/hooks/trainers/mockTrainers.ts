
import { TrainerProfile } from './types';

export const getMockTrainers = (): TrainerProfile[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      bio: 'Professional fitness trainer with over 10 years of experience.',
      profile_picture: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'trainer',
      specialization: ['Strength', 'Cardio', 'Nutrition'],
      status: 'Active',
      hire_date: '2018-03-15',
      experience_years: 10,
      experience_level: 'Expert',
      hourly_rate: 75,
      certifications: [],
      availability: []
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      bio: 'Specialized in yoga and flexibility training.',
      profile_picture: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'trainer',
      specialization: ['Yoga', 'Pilates', 'Flexibility'],
      status: 'Active',
      hire_date: '2019-06-22',
      experience_years: 7,
      experience_level: 'Advanced',
      hourly_rate: 65,
      certifications: [],
      availability: []
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1122334455',
      bio: 'Focused on athletic performance and sports-specific training.',
      profile_picture: 'https://randomuser.me/api/portraits/men/67.jpg',
      role: 'trainer',
      specialization: ['Sports', 'Performance', 'Rehabilitation'],
      status: 'On Leave',
      hire_date: '2020-01-10',
      experience_years: 5,
      experience_level: 'Intermediate',
      hourly_rate: 60,
      certifications: [],
      availability: []
    }
  ];
};

export default getMockTrainers;
