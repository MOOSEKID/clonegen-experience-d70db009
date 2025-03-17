
export interface MemberInfo {
  id: number;
  name: string;
  email: string;
}

export interface ClassType {
  id: number;
  name: string;
  description: string;
  type: 'yoga' | 'hiit' | 'strength' | 'cardio' | 'pilates' | 'other';
  trainer: string;
  capacity: number;
  enrolled: number;
  enrolledMembers: MemberInfo[];
  waitlist: number;
  waitlistMembers: MemberInfo[];
  day: string;
  time: string;
  duration: number;
  room: string;
  status: 'scheduled' | 'canceled' | 'full';
}
