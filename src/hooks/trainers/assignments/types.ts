
export interface ClientAssignment {
  id: string;
  trainer_id: string;
  client_id: string;
  assignment_date: string;
  end_date?: string;
  status: 'active' | 'paused' | 'ended';
  notes?: string;
  created_at: string;
  updated_at: string;
  client_name?: string;
  trainer_name?: string;
}

export interface AssignedClient {
  id: string;
  name: string;
  assignmentId: string;
  status: string;
}
