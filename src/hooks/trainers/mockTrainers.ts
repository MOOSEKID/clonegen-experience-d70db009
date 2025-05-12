
import { TrainerProfile } from './types';

export const getMockTrainers = (): TrainerProfile[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@uptowngym.com',
      phone: '+250 78 123 4567',
      specialization: ['Weight Training', 'Nutrition'],
      bio: 'John is a certified personal trainer with 5 years of experience specializing in strength training and nutrition counseling.',
      status: 'Active',
      hiredate: '2020-06-15',
      experience_years: 5,
      experience_level: 'Advanced',
      certifications: [
        {
          id: 'cert1',
          trainer_id: '1',
          certification_name: 'NASM Certified Personal Trainer',
          issuing_organization: 'National Academy of Sports Medicine',
          issue_date: '2018-04-20',
          expiry_date: '2023-04-20'
        },
        {
          id: 'cert2',
          trainer_id: '1',
          certification_name: 'Precision Nutrition Level 1',
          issuing_organization: 'Precision Nutrition',
          issue_date: '2019-02-15',
          expiry_date: '2024-02-15'
        }
      ],
      availability: [
        {
          id: 'avail1',
          trainer_id: '1',
          day_of_week: 'Monday',
          start_time: '08:00',
          end_time: '17:00'
        },
        {
          id: 'avail2',
          trainer_id: '1',
          day_of_week: 'Wednesday',
          start_time: '08:00',
          end_time: '17:00'
        },
        {
          id: 'avail3',
          trainer_id: '1',
          day_of_week: 'Friday',
          start_time: '08:00',
          end_time: '17:00'
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@uptowngym.com',
      phone: '+250 79 876 5432',
      specialization: ['Yoga', 'Pilates', 'Meditation'],
      bio: 'Jane is a yoga and pilates instructor with a focus on mindfulness and rehabilitation exercises for clients of all ages.',
      status: 'Active',
      hiredate: '2019-03-10',
      experience_years: 7,
      experience_level: 'Expert',
      certifications: [
        {
          id: 'cert3',
          trainer_id: '2',
          certification_name: '500-Hour Yoga Teacher Training',
          issuing_organization: 'Yoga Alliance',
          issue_date: '2017-07-12',
          expiry_date: '2022-07-12'
        },
        {
          id: 'cert4',
          trainer_id: '2',
          certification_name: 'Pilates Method Alliance Certification',
          issuing_organization: 'Pilates Method Alliance',
          issue_date: '2018-09-22',
          expiry_date: '2023-09-22'
        }
      ],
      availability: [
        {
          id: 'avail4',
          trainer_id: '2',
          day_of_week: 'Tuesday',
          start_time: '10:00',
          end_time: '19:00'
        },
        {
          id: 'avail5',
          trainer_id: '2',
          day_of_week: 'Thursday',
          start_time: '10:00',
          end_time: '19:00'
        },
        {
          id: 'avail6',
          trainer_id: '2',
          day_of_week: 'Saturday',
          start_time: '09:00',
          end_time: '14:00'
        }
      ]
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@uptowngym.com',
      phone: '+250 72 345 6789',
      specialization: ['HIIT', 'CrossFit', 'Group Training'],
      bio: 'Mike specializes in high-intensity interval training and CrossFit methodology for clients looking to maximize their fitness results.',
      status: 'Active',
      hiredate: '2021-01-15',
      experience_years: 4,
      experience_level: 'Intermediate',
      certifications: [
        {
          id: 'cert5',
          trainer_id: '3',
          certification_name: 'CrossFit Level 2 Trainer',
          issuing_organization: 'CrossFit Inc.',
          issue_date: '2020-03-15',
          expiry_date: '2024-03-15'
        }
      ],
      availability: [
        {
          id: 'avail7',
          trainer_id: '3',
          day_of_week: 'Monday',
          start_time: '15:00',
          end_time: '21:00'
        },
        {
          id: 'avail8',
          trainer_id: '3',
          day_of_week: 'Tuesday',
          start_time: '15:00',
          end_time: '21:00'
        },
        {
          id: 'avail9',
          trainer_id: '3',
          day_of_week: 'Thursday',
          start_time: '15:00',
          end_time: '21:00'
        },
        {
          id: 'avail10',
          trainer_id: '3',
          day_of_week: 'Saturday',
          start_time: '14:00',
          end_time: '20:00'
        }
      ]
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.williams@uptowngym.com',
      phone: '+250 73 567 8901',
      specialization: ['Senior Fitness', 'Rehabilitation', 'Functional Training'],
      bio: 'Sarah focuses on functional fitness and rehabilitation training, especially for older adults and individuals recovering from injuries.',
      status: 'Active',
      hiredate: '2020-07-20',
      experience_years: 6,
      experience_level: 'Advanced',
      certifications: [
        {
          id: 'cert6',
          trainer_id: '4',
          certification_name: 'ACSM Certified Exercise Physiologist',
          issuing_organization: 'American College of Sports Medicine',
          issue_date: '2019-05-15',
          expiry_date: '2023-05-15'
        },
        {
          id: 'cert7',
          trainer_id: '4',
          certification_name: 'Functional Aging Specialist',
          issuing_organization: 'Functional Aging Institute',
          issue_date: '2020-02-10',
          expiry_date: '2022-02-10'
        }
      ],
      availability: [
        {
          id: 'avail11',
          trainer_id: '4',
          day_of_week: 'Wednesday',
          start_time: '08:00',
          end_time: '15:00'
        },
        {
          id: 'avail12',
          trainer_id: '4',
          day_of_week: 'Friday',
          start_time: '08:00',
          end_time: '15:00'
        },
        {
          id: 'avail13',
          trainer_id: '4',
          day_of_week: 'Sunday',
          start_time: '10:00',
          end_time: '16:00'
        }
      ]
    }
  ];
};
