
export interface ClientSession {
  id: string;
  trainer_id: string;
  client_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  session_type: string;
  location: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
  created_at: string;
  updated_at: string;
  client_name?: string;
  trainer_name?: string;
}

export interface ClientSessionInput {
  trainer_id: string;
  client_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration?: number;
  session_type?: string;
  location?: string;
  status?: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
}
