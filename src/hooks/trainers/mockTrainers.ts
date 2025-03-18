
import { TrainerProfile } from './types';

export const getMockTrainers = (): TrainerProfile[] => {
  const mockTrainers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@uptowngym.com",
      phone: "+1234567890",
      bio: "Certified personal trainer with 5+ years of experience in strength training and weight loss.",
      specialization: ["Strength Training", "Weight Loss"],
      status: "Active",
      hiredate: "2022-01-15",
      profilepicture: null,
      experience_years: 5,
      experience_level: "Intermediate",
      certifications: [
        {
          id: "cert1",
          trainer_id: "1",
          certification_name: "NASM Certified Personal Trainer",
          issuing_organization: "National Academy of Sports Medicine",
          issue_date: "2020-05-20",
          expiry_date: "2024-05-20"
        },
        {
          id: "cert2",
          trainer_id: "1",
          certification_name: "First Aid & CPR",
          issuing_organization: "Red Cross",
          issue_date: "2023-01-10",
          expiry_date: "2025-01-10"
        }
      ],
      availability: [
        {
          id: "avail1",
          trainer_id: "1",
          day_of_week: "Monday",
          start_time: "09:00",
          end_time: "17:00"
        },
        {
          id: "avail2",
          trainer_id: "1",
          day_of_week: "Wednesday",
          start_time: "09:00",
          end_time: "17:00"
        },
        {
          id: "avail3",
          trainer_id: "1",
          day_of_week: "Friday",
          start_time: "09:00",
          end_time: "17:00"
        }
      ]
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@uptowngym.com",
      phone: "+1987654321",
      bio: "Yoga instructor and mindfulness coach with expertise in Hatha and Vinyasa styles.",
      specialization: ["Yoga", "Pilates", "Meditation"],
      status: "Active",
      hiredate: "2022-03-10",
      profilepicture: null,
      experience_years: 8,
      experience_level: "Advanced",
      certifications: [
        {
          id: "cert3",
          trainer_id: "2",
          certification_name: "RYT 200-Hour Yoga Teacher",
          issuing_organization: "Yoga Alliance",
          issue_date: "2019-11-15",
          expiry_date: null
        }
      ],
      availability: [
        {
          id: "avail4",
          trainer_id: "2",
          day_of_week: "Tuesday",
          start_time: "08:00",
          end_time: "14:00"
        },
        {
          id: "avail5",
          trainer_id: "2",
          day_of_week: "Thursday",
          start_time: "08:00",
          end_time: "14:00"
        },
        {
          id: "avail6",
          trainer_id: "2",
          day_of_week: "Saturday",
          start_time: "10:00",
          end_time: "15:00"
        }
      ]
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@uptowngym.com",
      phone: "+1122334455",
      bio: "Former athlete specializing in sports-specific training and athletic performance.",
      specialization: ["Sports Performance", "HIIT", "Functional Training"],
      status: "Active",
      hiredate: "2022-06-01",
      profilepicture: null,
      experience_years: 3,
      experience_level: "Beginner",
      certifications: [
        {
          id: "cert4",
          trainer_id: "3",
          certification_name: "CSCS",
          issuing_organization: "NSCA",
          issue_date: "2021-02-28",
          expiry_date: "2025-02-28"
        }
      ],
      availability: [
        {
          id: "avail7",
          trainer_id: "3",
          day_of_week: "Monday",
          start_time: "14:00",
          end_time: "21:00"
        },
        {
          id: "avail8",
          trainer_id: "3",
          day_of_week: "Wednesday",
          start_time: "14:00",
          end_time: "21:00"
        },
        {
          id: "avail9",
          trainer_id: "3",
          day_of_week: "Friday",
          start_time: "14:00",
          end_time: "21:00"
        },
        {
          id: "avail10",
          trainer_id: "3",
          day_of_week: "Sunday",
          start_time: "10:00",
          end_time: "16:00"
        }
      ]
    }
  ];
  
  return mockTrainers;
};
