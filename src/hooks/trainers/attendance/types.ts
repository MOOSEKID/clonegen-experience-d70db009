
export interface TrainerAttendanceRecord {
  id: string;
  trainer_id: string;
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  trainer_name?: string;
}

export interface CheckInOutResult {
  success: boolean;
  data: TrainerAttendanceRecord | null;
  message?: string;
}
