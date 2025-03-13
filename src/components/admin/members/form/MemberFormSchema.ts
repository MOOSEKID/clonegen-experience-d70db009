
import * as z from "zod";

export const memberFormSchema = z.object({
  // Basic Information
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(9, {
    message: "Phone number must be at least 9 characters.",
  }),
  membershipType: z.enum(['Basic', 'Standard', 'Premium'], {
    required_error: "Please select a membership type.",
  }),
  status: z.enum(['Active', 'Inactive']).default('Active'),
  
  // Personal Details
  dateOfBirth: z.date().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  
  // Membership Details
  membershipPlan: z.enum(['Monthly', 'Quarterly', 'Yearly', 'Custom']).default('Monthly'),
  membershipCategory: z.enum(['Individual', 'Company']).default('Individual'),
  
  // Additional Information
  trainerAssigned: z.string().optional(),
  workoutGoals: z.enum(['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness']).optional(),
  medicalConditions: z.string().optional(),
  preferredWorkoutTime: z.array(z.enum(['Morning', 'Afternoon', 'Evening', 'Anytime'])).default([]),
  paymentStatus: z.enum(['Paid', 'Pending', 'Overdue']).default('Pending'),
  discountsUsed: z.enum(['Yes', 'No']).default('No'),
  notes: z.string().optional(),
  
  // Authentication
  profilePicture: z.string().optional(),
  nfcCardId: z.string().optional(),
  fingerprintId: z.string().optional(),
  
  // Company Membership Fields (Only required if membershipCategory is 'Company')
  companyName: z.string().optional(),
  companyContactPerson: z.string().optional(),
  companyEmail: z.string().email().optional(),
  companyPhone: z.string().optional(),
  companyMembershipPlan: z.enum(['Standard', 'Premium', 'Custom']).optional(),
  membersCovered: z.number().optional(),
  billingCycle: z.enum(['Monthly', 'Quarterly', 'Annually']).optional(),
  paymentMode: z.enum(['Company Invoice', 'Direct Payment']).optional(),
  
  // Individual linking to company
  linkedToCompany: z.boolean().default(false),
  linkedCompanyName: z.string().optional(),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;
