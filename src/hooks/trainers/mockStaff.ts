
import { StaffProfile } from './types';

export const getMockStaff = (): StaffProfile[] => {
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
      experience_level: 'Expert'
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
      experience_level: 'Advanced'
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
      experience_level: 'Intermediate'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+2233445566',
      bio: 'Receptionist with excellent customer service skills.',
      profile_picture: 'https://randomuser.me/api/portraits/women/22.jpg',
      role: 'receptionist',
      specialization: [],
      status: 'Active',
      hire_date: '2021-04-15',
      experience_years: 3,
      experience_level: 'Intermediate'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+3344556677',
      bio: 'Facility manager responsible for maintenance and equipment.',
      profile_picture: 'https://randomuser.me/api/portraits/men/45.jpg',
      role: 'manager',
      specialization: [],
      status: 'Active',
      hire_date: '2017-08-01',
      experience_years: 8,
      experience_level: 'Expert'
    }
  ];
};

export default getMockStaff;
