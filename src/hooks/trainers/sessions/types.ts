
export interface ClientSession {
  id: string;
  assigned_trainer_id: string;
  member_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes: string | null;
  session_focus_tags: string[] | null;
  session_outcomes: string | null;
  session_location: string | null;
  session_type: string | null;
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
  status?: 'scheduled' | 'completed' | 'canceled' | 'no-show';
  notes?: string;
  session_focus_tags?: string[];
  session_outcomes?: string;
  session_location?: string;
  session_type?: string;
}
