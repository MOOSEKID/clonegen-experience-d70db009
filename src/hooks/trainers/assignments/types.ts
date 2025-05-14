
export interface ClientAssignment {
  id: string;
  staff_id: string;
  client_id: string;
  assignment_date: string;
  end_date?: string | null;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssignedClient {
  id: string;
  name: string;
  assignmentId: string;
  status?: string;
}
