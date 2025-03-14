
export type ClassStatus = 'scheduled' | 'full' | 'canceled';

export interface ClassEnrollment {
  id: string;
  class_id: string;
  member_id: string;
  member_name?: string;
  member_email?: string;
  status: 'enrolled' | 'waitlisted' | 'canceled';
  enrollment_date: string;
  waitlist_position?: number;
}

export interface GymClass {
  id: string;
  name: string;
  description: string;
  type: string;
  trainer_id: string;
  trainer_name?: string;
  capacity: number;
  enrolled?: number;
  day: string;
  time: string;
  duration: number;
  room?: string;
  status: ClassStatus;
  enrollments?: ClassEnrollment[];
}

// Add ClassType for backward compatibility
export type ClassType = GymClass;

// Add MemberInfo for backward compatibility
export interface MemberInfo {
  id: string;
  name: string;
  email: string;
  status?: string;
}

// Type for RPC parameters
export interface UpdateWaitlistPositionsParams {
  class_id_param: string;
}
