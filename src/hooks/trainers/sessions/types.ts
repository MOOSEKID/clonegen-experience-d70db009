export type SessionStatus = 'scheduled' | 'completed' | 'canceled' | 'no-show';

export interface ClientSession {
  id: string;
  assigned_trainer_id: string;
  member_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: SessionStatus;
  notes: string | null;
  focus_areas: string[] | null;
  achievements: string | null;
  created_at: string;
  updated_at: string;
  client_name?: string;
  staff_name?: string;
}

export interface ClientSessionInput {
  assigned_trainer_id: string;
  member_id: string;
  session_date: string;
  start_time?: string;
  end_time?: string;
  duration: number;
  status?: SessionStatus;
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
}