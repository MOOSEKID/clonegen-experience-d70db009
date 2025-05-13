
import { StaffProfile } from './types';

export const getMockStaff = (): StaffProfile[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@uptowngym.com',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced fitness coach with 5+ years specializing in strength training and HIIT workouts.',
      profile_picture: '/assets/trainers/john-doe.jpg',
      role: 'trainer',
      specialization: ['Strength Training', 'HIIT'],
      status: 'Active',
      hire_date: '2019-05-15',
      experience_years: 5,
      experience_level: 'Advanced',
      certifications: [
        {
          id: '101',
          staff_id: '1',
          certification_name: 'ACE Personal Trainer',
          issuing_organization: 'American Council on Exercise',
          issue_date: '2018-03-10',
          expiry_date: '2023-03-10',
          verified: true
        },
        {
          id: '102',
          staff_id: '1',
          certification_name: 'NASM Performance Enhancement',
          issuing_organization: 'National Academy of Sports Medicine',
          issue_date: '2019-07-22',
          expiry_date: '2023-07-22',
          verified: true
        }
      ],
      availability: [
        {
          id: '201',
          staff_id: '1',
          day_of_week: 'Monday',
          start_time: '09:00',
          end_time: '17:00'
        },
        {
          id: '202',
          staff_id: '1',
          day_of_week: 'Wednesday',
          start_time: '09:00',
          end_time: '17:00'
        },
        {
          id: '203',
          staff_id: '1',
          day_of_week: 'Friday',
          start_time: '09:00',
          end_time: '17:00'
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@uptowngym.com',
      phone: '+1 (555) 987-6543',
      bio: 'Specialized in yoga and pilates with focus on proper alignment and mindfulness in movement.',
      profile_picture: '/assets/trainers/jane-smith.jpg',
      role: 'trainer',
      specialization: ['Yoga', 'Pilates', 'Flexibility'],
      status: 'Active',
      hire_date: '2020-02-10',
      experience_years: 6,
      experience_level: 'Expert',
      certifications: [
        {
          id: '103',
          staff_id: '2',
          certification_name: '200-Hour Yoga Teacher Training',
          issuing_organization: 'Yoga Alliance',
          issue_date: '2017-05-18',
          expiry_date: null,
          verified: true
        },
        {
          id: '104',
          staff_id: '2',
          certification_name: 'Pilates Method Alliance Certification',
          issuing_organization: 'Pilates Method Alliance',
          issue_date: '2018-11-05',
          expiry_date: '2022-11-05',
          verified: true
        }
      ],
      availability: [
        {
          id: '204',
          staff_id: '2',
          day_of_week: 'Tuesday',
          start_time: '08:00',
          end_time: '16:00'
        },
        {
          id: '205',
          staff_id: '2',
          day_of_week: 'Thursday',
          start_time: '08:00',
          end_time: '16:00'
        },
        {
          id: '206',
          staff_id: '2',
          day_of_week: 'Saturday',
          start_time: '10:00',
          end_time: '14:00'
        }
      ]
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.johnson@uptowngym.com',
      phone: '+1 (555) 456-7890',
      bio: 'Former athlete specializing in sports-specific training and rehabilitation.',
      profile_picture: '/assets/trainers/michael-johnson.jpg',
      role: 'trainer',
      specialization: ['Sports Training', 'Rehabilitation', 'Athletic Performance'],
      status: 'Active',
      hire_date: '2018-08-23',
      experience_years: 8,
      experience_level: 'Expert',
      certifications: [
        {
          id: '105',
          staff_id: '3',
          certification_name: 'NSCA Certified Strength and Conditioning Specialist',
          issuing_organization: 'National Strength and Conditioning Association',
          issue_date: '2016-12-01',
          expiry_date: '2023-12-01',
          verified: true
        }
      ],
      availability: [
        {
          id: '207',
          staff_id: '3',
          day_of_week: 'Monday',
          start_time: '12:00',
          end_time: '20:00'
        },
        {
          id: '208',
          staff_id: '3',
          day_of_week: 'Tuesday',
          start_time: '12:00',
          end_time: '20:00'
        },
        {
          id: '209',
          staff_id: '3',
          day_of_week: 'Thursday',
          start_time: '12:00',
          end_time: '20:00'
        },
        {
          id: '210',
          staff_id: '3',
          day_of_week: 'Friday',
          start_time: '12:00',
          end_time: '20:00'
        }
      ]
    }
  ];
};
