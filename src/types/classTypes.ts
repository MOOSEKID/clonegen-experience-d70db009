
export interface MemberInfo {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: string;
}

export interface ClassType {
  id: number;
  name: string;
  description?: string;
  type: string;
  trainer: string;
  trainerId?: string;
  capacity: number;
  enrolled: number;
  enrolledMembers: MemberInfo[];
  waitlist: number;
  waitlistMembers: MemberInfo[];
  day: string;
  time: string;
  durationMinutes: number;
  room: string;
  status: string;
  classLevel?: string;
  equipmentRequired: string[];
  recurrence?: boolean;
  recurrenceDays?: string[];
  classFees: number | null;
  feeType?: string;
}

export interface GymLocation {
  id: string | number;
  name: string;
  type: 'room' | 'area';
  capacity: number;
  equipment: string[];
}

export interface PaymentGateway {
  id: string;
  name: string;
  description: string;
  status: string;
  icon: React.ReactNode;
  provider: string;
  fees: string;
  setupComplete: boolean;
  fee: string;  // Changed from optional to required to match the implementation
  isEnabled: boolean; // Changed from optional to required
  supportedCards: string[]; // Changed from optional to required
}
