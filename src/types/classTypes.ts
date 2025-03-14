
export interface MemberInfo {
  id: string;
  name: string;
  email: string;
}

export interface ClassType {
  id: number;
  name: string;
  description: string;
  type: 'yoga' | 'hiit' | 'strength' | 'cardio' | 'pilates' | 'other';
  trainer: string;
  trainerId?: string; // New field to store the trainer ID
  capacity: number;
  enrolled: number;
  enrolledMembers: MemberInfo[];
  waitlist: number;
  waitlistMembers: MemberInfo[];
  day: string;
  time: string;
  duration: number;
  room: string;
  status: 'scheduled' | 'canceled' | 'full' | 'open';
  // New fields
  classLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  equipmentRequired: string[];
  recurrence: boolean;
  classFees: number | null;
  feeType: 'per_session' | 'package' | null;
}
