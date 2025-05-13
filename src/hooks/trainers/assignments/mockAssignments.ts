
import { ClientAssignment } from '../types';

export const mockAssignments: ClientAssignment[] = [
  {
    id: '1',
    staff_id: '1',
    client_id: '101',
    assignment_date: '2023-04-15',
    end_date: '2023-10-15',
    status: 'active',
    notes: 'Weight loss program',
    created_at: '2023-04-15T10:00:00Z',
    updated_at: '2023-04-15T10:00:00Z'
  },
  {
    id: '2',
    staff_id: '1',
    client_id: '102',
    assignment_date: '2023-05-01',
    status: 'active',
    notes: 'Strength building program',
    created_at: '2023-05-01T14:30:00Z',
    updated_at: '2023-05-01T14:30:00Z'
  },
  {
    id: '3',
    staff_id: '2',
    client_id: '103',
    assignment_date: '2023-03-10',
    end_date: '2023-06-10',
    status: 'ended',
    notes: 'Rehabilitation after knee injury',
    created_at: '2023-03-10T09:15:00Z',
    updated_at: '2023-06-10T16:45:00Z'
  },
  {
    id: '4',
    staff_id: '2',
    client_id: '104',
    assignment_date: '2023-06-20',
    status: 'active',
    notes: 'Sports conditioning',
    created_at: '2023-06-20T11:30:00Z',
    updated_at: '2023-06-20T11:30:00Z'
  },
  {
    id: '5',
    staff_id: '3',
    client_id: '105',
    assignment_date: '2023-05-15',
    status: 'active',
    notes: 'Yoga and flexibility',
    created_at: '2023-05-15T17:00:00Z',
    updated_at: '2023-05-15T17:00:00Z'
  },
  {
    id: '6',
    staff_id: '3',
    client_id: '106',
    assignment_date: '2023-07-01',
    status: 'active',
    notes: 'Stress reduction and mindfulness',
    created_at: '2023-07-01T16:20:00Z',
    updated_at: '2023-07-01T16:20:00Z'
  },
  {
    id: '7',
    staff_id: '4',
    client_id: '107',
    assignment_date: '2023-02-10',
    end_date: '2023-05-10',
    status: 'paused',
    notes: 'High intensity training program paused due to client vacation',
    created_at: '2023-02-10T08:45:00Z',
    updated_at: '2023-04-25T14:10:00Z'
  },
  {
    id: '8',
    staff_id: '1',
    client_id: '108',
    assignment_date: '2023-01-15',
    end_date: '2023-04-15',
    status: 'ended',
    notes: 'Completed 3-month fitness challenge',
    created_at: '2023-01-15T10:30:00Z',
    updated_at: '2023-04-15T11:45:00Z'
  }
];

export default mockAssignments;
