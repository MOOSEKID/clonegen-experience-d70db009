
export interface ClientSession {
  id: string;
  trainer_id: string;
  client_id: string;
  session_date: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes: string | null;
  focus_areas: string[] | null;
  achievements: string | null;
  created_at: string;
  updated_at: string;
  client_name?: string;
  trainer_name?: string;
}

export interface ClientSessionInput {
  trainer_id: string;
  client_id: string;
  session_date: string;
  duration: number;
  status?: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
}
