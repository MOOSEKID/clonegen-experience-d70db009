import * as z from "zod";

export const memberFormSchema = z.object({
  // Membership Details
  membershipCategory: z.enum(['Individual', 'Company']).default('Individual'),
  
  // Individual fields with conditional validation
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).optional()
    .superRefine((val, ctx) => {
      // Only required for Individual memberships
      if (ctx.path[0] === 'name' && ctx.parent.membershipCategory === 'Individual' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name is required for individual memberships."
        });
        return false;
      }
      return true;
    }),
  
  email: z.string().email({
    message: "Invalid email address.",
  }).optional()
    .superRefine((val, ctx) => {
      // Only required for Individual memberships
      if (ctx.path[0] === 'email' && ctx.parent.membershipCategory === 'Individual' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required for individual memberships."
        });
        return false;
      }
      return true;
    }),
  
  phone: z.string().min(9, {
    message: "Phone number must be at least 9 characters.",
  }).optional()
    .superRefine((val, ctx) => {
      // Only required for Individual memberships
      if (ctx.path[0] === 'phone' && ctx.parent.membershipCategory === 'Individual' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is required for individual memberships."
        });
        return false;
      }
      return true;
    }),
  
  // Authentication fields
  generateUsername: z.boolean().default(true),
  username: z.string().optional()
    .superRefine((val, ctx) => {
      if (ctx.path[0] === 'username' && !ctx.parent.generateUsername && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username is required when not auto-generating."
        });
      }
      return true;
    }),
  
  generateTemporaryPassword: z.boolean().default(true),
  temporaryPassword: z.string().optional()
    .superRefine((val, ctx) => {
      if (ctx.path[0] === 'temporaryPassword' && !ctx.parent.generateTemporaryPassword && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required when not auto-generating."
        });
      }
      return true;
    }),
  
  sendCredentials: z.boolean().default(true),
  
  // Rest of the schema remains unchanged
  membershipType: z.enum(['Basic', 'Standard', 'Premium'], {
    required_error: "Please select a membership type.",
  }),
  status: z.enum(['Active', 'Inactive', 'Pending']).default('Active'),
  
  // Personal Details
  dateOfBirth: z.date().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  
  // Membership Details
  membershipPlan: z.enum(['Monthly', 'Quarterly', 'Yearly', 'Custom']).default('Monthly'),
  
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
  
  // Company Membership Fields
  companyName: z.string().optional()
    .superRefine((val, ctx) => {
      // Required for Company memberships
      if (ctx.path[0] === 'companyName' && ctx.parent.membershipCategory === 'Company' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name is required for company memberships."
        });
        return false;
      }
      return true;
    }),
  
  companyContactPerson: z.string().optional(),
  companyEmail: z.string().email().optional()
    .superRefine((val, ctx) => {
      // Required for Company memberships
      if (ctx.path[0] === 'companyEmail' && ctx.parent.membershipCategory === 'Company' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company email is required for company memberships."
        });
        return false;
      }
      return true;
    }),
  
  companyPhone: z.string().optional()
    .superRefine((val, ctx) => {
      // Required for Company memberships
      if (ctx.path[0] === 'companyPhone' && ctx.parent.membershipCategory === 'Company' && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company phone is required for company memberships."
        });
        return false;
      }
      return true;
    }),
  
  companyAddress: z.string().optional(),
  companyTIN: z.string().optional(),
  companyLogo: z.string().optional(),
  companyMembershipPlan: z.enum(['Standard', 'Premium', 'Enterprise', 'Custom']).optional(),
  membersCovered: z.number().optional(),
  billingCycle: z.enum(['Monthly', 'Quarterly', 'Annually']).optional(),
  paymentMode: z.enum(['Company Invoice', 'Direct Payment']).optional(),
  subscriptionModel: z.enum(['Fixed Fee', 'Per-Signature']).optional(),
  corporateDiscount: z.object({
    type: z.enum(['Fixed Percentage', 'Tiered', 'Custom']).optional(),
    value: z.number().optional()
  }).optional(),
  
  // Individual linking to company
  linkedToCompany: z.boolean().default(false),
  linkedCompanyName: z.string().optional(),
  
  // Company admin user (to be added later)
  hasAdminUser: z.boolean().default(false),
  adminSetupRequired: z.boolean().default(true),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;
