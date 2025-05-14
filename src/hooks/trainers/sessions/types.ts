
export interface ClientSession {
  id: string;
  staff_id: string;
  client_id: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes: string | null;
  focus_areas: string[] | null;
  achievements: string | null;
  createdAt: string;
  updatedAt: string;
  client_name?: string;
  staff_name?: string;
}

export interface ClientSessionInput {
  staff_id: string;
  client_id: string;
  date: string;
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  status?: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
}
