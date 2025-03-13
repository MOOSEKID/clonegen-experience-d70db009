
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  startDate: string;
  endDate: string;
  status: string;
  lastCheckin: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  membershipPlan?: string;
  trainerAssigned?: string;
  workoutGoals?: string;
  medicalConditions?: string;
  preferredWorkoutTime?: string[];
  paymentStatus?: string;
  discountsUsed?: string;
  notes?: string;
  profilePicture?: string;
  nfcCardId?: string;
  fingerprintId?: string;
}
