
// Mock member data
export const mockMembers = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@example.com', 
    phone: '+250 78123456', 
    membershipType: 'Premium',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    status: 'Active',
    lastCheckin: '2023-06-15 09:45 AM',
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    phone: '+250 79123456', 
    membershipType: 'Standard',
    startDate: '2023-02-10',
    endDate: '2023-08-10',
    status: 'Active',
    lastCheckin: '2023-06-14 06:30 PM',
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    phone: '+250 72123456', 
    membershipType: 'Basic',
    startDate: '2023-03-20',
    endDate: '2023-09-20',
    status: 'Inactive',
    lastCheckin: '2023-05-30 11:15 AM',
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    phone: '+250 73123456', 
    membershipType: 'Premium',
    startDate: '2023-01-05',
    endDate: '2024-01-05',
    status: 'Active',
    lastCheckin: '2023-06-15 08:00 AM',
  },
  { 
    id: 5, 
    name: 'David Wilson', 
    email: 'david@example.com', 
    phone: '+250 76123456', 
    membershipType: 'Standard',
    startDate: '2023-04-12',
    endDate: '2023-10-12',
    status: 'Active',
    lastCheckin: '2023-06-13 05:45 PM',
  },
];

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  startDate: string;
  endDate: string;
  status: string;
  lastCheckin: string;
}
