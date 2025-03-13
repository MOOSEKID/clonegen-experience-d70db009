
export interface Member {
  id?: string; // UUID from Supabase
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
  
  // Authentication fields
  username?: string;
  passwordResetRequired?: boolean;
  accountEnabled?: boolean;
  lastLogin?: string;
  temporaryPassword?: string; // Only used during creation, not stored
  
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
  linkedCompanyId?: string;
  linkedCompanyName?: string;
  
  // Company admin user setup
  hasAdminUser?: boolean; 
  adminSetupRequired?: boolean;
  
  // Attendance tracking (for reporting)
  attendanceHistory?: Array<{
    date: string;
    checkInTime: string;
    checkOutTime?: string;
  }>;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
}

// Need to add these types for form handling
export interface MemberFormAction {
  generateUsername?: boolean;
  generateTemporaryPassword?: boolean;
  sendCredentials?: boolean;
  temporaryPassword?: string;
  adminSetupRequired?: boolean;
  hasAdminUser?: boolean;
}

export interface CompanyInvoice {
  id: string;
  companyId: string;
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
  id: string;
  memberId: string;
  memberName: string;
  companyId?: string;
  companyName?: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number; // In minutes
}

// User credentials for authentication
export interface UserCredentials {
  username: string;
  password: string;
}

// Auth actions that admins can perform
export type AuthAction = 
  | 'reset_password'
  | 'change_username'
  | 'disable_account'
  | 'enable_account'
  | 'force_password_reset';
