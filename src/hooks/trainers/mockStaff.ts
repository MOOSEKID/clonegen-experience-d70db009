
import { StaffProfile } from './types';

export const getMockStaff = (): StaffProfile[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@uptowngym.com',
      phone: '+1234567890',
      bio: 'Experienced personal trainer specializing in strength and conditioning.',
      profile_picture: null,
      role: 'trainer',
      specialization: ['Strength', 'Conditioning'],
      status: 'Active',
      hire_date: '2022-01-15',
      experience_years: 5,
      experience_level: 'Advanced',
      hourly_rate: 45,
      certifications: [
        {
          id: '101',
          staff_id: '1',
          certification_name: 'Certified Personal Trainer',
          issuing_organization: 'National Academy of Sports Medicine',
          issue_date: '2018-03-10',
          expiry_date: '2023-03-10',
          verified: true,
          certification_file: null,
          created_at: '2022-01-15T00:00:00Z',
          updated_at: '2022-01-15T00:00:00Z'
        }
      ],
      availability: [],
      stripe_account_id: null,
      created_at: '2022-01-15T00:00:00Z',
      updated_at: '2022-01-15T00:00:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@uptowngym.com',
      phone: '+1987654321',
      bio: 'Yoga and pilates instructor focused on flexibility and mindfulness training.',
      profile_picture: null,
      role: 'trainer',
      specialization: ['Yoga', 'Pilates'],
      status: 'Active',
      hire_date: '2021-06-20',
      experience_years: 8,
      experience_level: 'Expert',
      hourly_rate: 50,
      certifications: [
        {
          id: '201',
          staff_id: '2',
          certification_name: 'Registered Yoga Teacher 500',
          issuing_organization: 'Yoga Alliance',
          issue_date: '2015-05-15',
          expiry_date: null,
          verified: true,
          certification_file: null,
          created_at: '2021-06-20T00:00:00Z',
          updated_at: '2021-06-20T00:00:00Z'
        }
      ],
      availability: [],
      stripe_account_id: null,
      created_at: '2021-06-20T00:00:00Z',
      updated_at: '2021-06-20T00:00:00Z'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@uptowngym.com',
      phone: '+1547896321',
      bio: 'Former athlete turned fitness trainer specializing in HIIT and functional fitness.',
      profile_picture: null,
      role: 'trainer',
      specialization: ['HIIT', 'Functional Training'],
      status: 'Active',
      hire_date: '2022-03-05',
      experience_years: 3,
      experience_level: 'Intermediate',
      hourly_rate: 40,
      certifications: [
        {
          id: '301',
          staff_id: '3',
          certification_name: 'Certified Functional Strength Coach',
          issuing_organization: 'Functional Movement Systems',
          issue_date: '2020-11-12',
          expiry_date: '2025-11-12',
          verified: true,
          certification_file: null,
          created_at: '2022-03-05T00:00:00Z',
          updated_at: '2022-03-05T00:00:00Z'
        }
      ],
      availability: [],
      stripe_account_id: null,
      created_at: '2022-03-05T00:00:00Z',
      updated_at: '2022-03-05T00:00:00Z'
    }
  ];
};
