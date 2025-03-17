
import { Member } from '@/types/memberTypes';

// Mock data for member management
export const getMemberData = (): Member[] => {
  return [
    {
      id: 'MEM001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      membershipType: 'Premium',
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      status: 'Active',
      lastCheckin: '2023-06-05',
      gender: 'Male',
      dateOfBirth: '1985-03-22',
      created_at: '2023-01-10',
      updated_at: '2023-05-20'
    },
    {
      id: 'MEM002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      membershipType: 'Standard',
      startDate: '2023-02-10',
      endDate: '2023-08-10',
      status: 'Active',
      lastCheckin: '2023-06-04',
      gender: 'Female',
      dateOfBirth: '1990-07-15',
      created_at: '2023-02-05',
      updated_at: '2023-05-25'
    },
    {
      id: 'MEM003',
      name: 'Robert Johnson',
      email: 'robert.j@example.com',
      phone: '+1122334455',
      membershipType: 'Basic',
      startDate: '2023-03-05',
      endDate: '2023-09-05',
      status: 'Inactive',
      lastCheckin: '2023-05-20',
      gender: 'Male',
      dateOfBirth: '1978-11-30',
      created_at: '2023-03-01',
      updated_at: '2023-05-22'
    },
    {
      id: 'MEM004',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+5566778899',
      membershipType: 'Premium',
      startDate: '2023-01-20',
      endDate: '2024-01-20',
      status: 'Active',
      lastCheckin: '2023-06-03',
      gender: 'Female',
      dateOfBirth: '1992-05-12',
      created_at: '2023-01-15',
      updated_at: '2023-05-30'
    },
    {
      id: 'MEM005',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1029384756',
      membershipType: 'Standard',
      startDate: '2023-04-15',
      endDate: '2023-10-15',
      status: 'Active',
      lastCheckin: '2023-06-01',
      gender: 'Male',
      dateOfBirth: '1983-09-08',
      created_at: '2023-04-10',
      updated_at: '2023-05-28'
    }
  ];
};
