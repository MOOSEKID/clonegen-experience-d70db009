
import { StaffProfile, StaffCertification, StaffAvailability } from './types';
import { v4 as uuidv4 } from 'uuid';

export const mockTrainers: StaffProfile[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(123) 456-7890',
    bio: 'Jane is a certified personal trainer with 10 years of experience specializing in strength training and weight loss.',
    profile_picture: '/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png',
    role: 'trainer',
    specialization: ['Strength Training', 'Weight Loss', 'Nutrition'],
    status: 'Active',
    hire_date: '2020-01-15',
    hourly_rate: 45,
    certifications: [
      {
        id: '101',
        staff_id: '1',
        certification_name: 'Personal Trainer Certification',
        issuing_organization: 'National Academy of Sports Medicine',
        issue_date: '2018-05-10',
        expiry_date: '2024-05-10',
        verified: true
      },
      {
        id: '102',
        staff_id: '1',
        certification_name: 'Nutrition Coach',
        issuing_organization: 'Precision Nutrition',
        issue_date: '2019-03-15',
        expiry_date: '2023-03-15',
        verified: true
      }
    ],
    availability: [
      {
        id: '201',
        staff_id: '1',
        day_of_week: 'monday',
        start_time: '08:00',
        end_time: '16:00'
      },
      {
        id: '202',
        staff_id: '1',
        day_of_week: 'wednesday',
        start_time: '08:00',
        end_time: '16:00'
      },
      {
        id: '203',
        staff_id: '1',
        day_of_week: 'friday',
        start_time: '08:00',
        end_time: '16:00'
      }
    ]
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(234) 567-8901',
    bio: 'John specializes in sports conditioning and rehabilitation. He has worked with professional athletes and enjoys helping clients recover from injuries.',
    profile_picture: '/lovable-uploads/ec104137-606c-4a99-a2c7-ed0a38667c39.png',
    role: 'trainer',
    specialization: ['Sports Conditioning', 'Rehabilitation', 'Functional Training'],
    status: 'Active',
    hire_date: '2019-06-20',
    hourly_rate: 50,
    certifications: [
      {
        id: '103',
        staff_id: '2',
        certification_name: 'Sports Conditioning Specialist',
        issuing_organization: 'American Council on Exercise',
        issue_date: '2017-07-22',
        expiry_date: '2023-07-22',
        verified: true
      }
    ],
    availability: [
      {
        id: '204',
        staff_id: '2',
        day_of_week: 'tuesday',
        start_time: '10:00',
        end_time: '18:00'
      },
      {
        id: '205',
        staff_id: '2',
        day_of_week: 'thursday',
        start_time: '10:00',
        end_time: '18:00'
      },
      {
        id: '206',
        staff_id: '2',
        day_of_week: 'saturday',
        start_time: '09:00',
        end_time: '14:00'
      },
      {
        id: '207',
        staff_id: '2',
        day_of_week: 'sunday',
        start_time: '09:00',
        end_time: '14:00'
      }
    ]
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(345) 678-9012',
    bio: 'Sarah is passionate about yoga and mindfulness. She helps clients build strength and flexibility while focusing on mental wellness.',
    profile_picture: '/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png',
    role: 'trainer',
    specialization: ['Yoga', 'Pilates', 'Mindfulness'],
    status: 'Active',
    hire_date: '2021-03-10',
    hourly_rate: 40,
    certifications: [
      {
        id: '104',
        staff_id: '3',
        certification_name: 'Yoga Instructor',
        issuing_organization: 'Yoga Alliance',
        issue_date: '2019-04-15',
        expiry_date: '2025-04-15',
        verified: true
      },
      {
        id: '105',
        staff_id: '3',
        certification_name: 'Pilates Instructor',
        issuing_organization: 'Pilates Method Alliance',
        issue_date: '2020-06-30',
        expiry_date: '2024-06-30',
        verified: true
      }
    ],
    availability: [
      {
        id: '208',
        staff_id: '3',
        day_of_week: 'monday',
        start_time: '16:00',
        end_time: '21:00'
      },
      {
        id: '209',
        staff_id: '3',
        day_of_week: 'tuesday',
        start_time: '16:00',
        end_time: '21:00'
      },
      {
        id: '210',
        staff_id: '3',
        day_of_week: 'thursday',
        start_time: '16:00',
        end_time: '21:00'
      },
      {
        id: '211',
        staff_id: '3',
        day_of_week: 'friday',
        start_time: '16:00',
        end_time: '21:00'
      }
    ]
  },
  {
    id: '4',
    name: 'David Lee',
    email: 'david.lee@example.com',
    phone: '(456) 789-0123',
    bio: 'David is a former professional athlete specializing in high-intensity interval training and athletic performance.',
    profile_picture: '/lovable-uploads/7dcb1541-09e5-4dc0-afbf-e868d229ff1c.png',
    role: 'trainer',
    specialization: ['HIIT', 'Athletic Performance', 'Strength Training'],
    status: 'On Leave',
    hire_date: '2018-09-05',
    hourly_rate: 55,
    certifications: [
      {
        id: '106',
        staff_id: '4',
        certification_name: 'Performance Enhancement Specialist',
        issuing_organization: 'National Academy of Sports Medicine',
        issue_date: '2016-11-20',
        expiry_date: '2022-11-20',
        verified: false
      }
    ],
    availability: []
  }
];

export const generateMockTrainer = (): StaffProfile => {
  const id = uuidv4();
  return {
    id,
    name: `New Trainer ${Math.floor(Math.random() * 1000)}`,
    email: `trainer${Math.floor(Math.random() * 1000)}@example.com`,
    phone: `(${Math.floor(Math.random() * 1000)}) ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
    bio: 'This is a new trainer profile.',
    profile_picture: '',
    role: 'trainer',
    specialization: ['General Fitness'],
    status: 'Active',
    hire_date: new Date().toISOString().split('T')[0],
    hourly_rate: 40,
    certifications: [],
    availability: []
  };
};

export const generateMockCertification = (staffId: string): StaffCertification => {
  return {
    id: uuidv4(),
    staff_id: staffId,
    certification_name: `Certification ${Math.floor(Math.random() * 100)}`,
    issuing_organization: `Organization ${Math.floor(Math.random() * 100)}`,
    issue_date: new Date().toISOString().split('T')[0],
    expiry_date: new Date(Date.now() + 31536000000).toISOString().split('T')[0],
    verified: false
  };
};

export const generateMockAvailability = (staffId: string): StaffAvailability => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const randomDay = days[Math.floor(Math.random() * days.length)];
  
  const startHour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
  const endHour = startHour + Math.floor(Math.random() * 4) + 2; // 2-6 hours later
  
  return {
    id: uuidv4(),
    staff_id: staffId,
    day_of_week: randomDay,
    start_time: `${startHour.toString().padStart(2, '0')}:00`,
    end_time: `${endHour.toString().padStart(2, '0')}:00`
  };
};

export default mockTrainers;
