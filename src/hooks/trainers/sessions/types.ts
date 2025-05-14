
export interface ClientSession {
  id: string;
  staff_id: string;
  client_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes: string | null;
  focus_areas: string[] | null;
  achievements: string | null;
  created_at: string;
  updated_at: string;
  client_name?: string;
  staff_name?: string;
}

export interface ClientSessionInput {
  staff_id: string;
  client_id: string;
  session_date: string;
  start_time?: string;
  end_time?: string;
  duration: number;
  status?: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  session_focus_tags?: string[];
  session_outcomes?: string;
  session_location?: string;
  session_type?: string;
}
