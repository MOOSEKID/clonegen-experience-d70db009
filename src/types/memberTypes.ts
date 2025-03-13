
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
  membershipCategory?: string;
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
  
  // Company-specific fields
  companyName?: string;
  companyContactPerson?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyTIN?: string;
  companyLogo?: string;
  companyMembershipPlan?: string;
  membersCovered?: number;
  billingCycle?: string;
  paymentMode?: string;
  subscriptionModel?: string;
  corporateDiscount?: {
    type?: string;
    value?: number;
  };
  
  // Individual member linked to company
  linkedToCompany?: boolean;
  linkedCompanyName?: string;
  
  // Attendance tracking (for reporting)
  attendanceHistory?: Array<{
    date: string;
    checkInTime: string;
    checkOutTime?: string;
  }>;
}

export interface CompanyInvoice {
  id: number;
  companyId: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  notes?: string;
}

export interface AttendanceRecord {
  id: number;
  memberId: number;
  memberName: string;
  companyId?: number;
  companyName?: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number; // In minutes
}
