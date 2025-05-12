
export interface ClientAssignment {
  id: string;
  staff_id: string;
  client_id: string;
  assignment_date: string;
  status: 'active' | 'paused' | 'ended';
  created_at: string;
  updated_at: string;
  client_name?: string;
  staff_name?: string;
}

export interface AssignedClient {
  id: string;
  name: string;
  assignmentId: string;
  status: 'active' | 'paused' | 'ended';
}
