
import * as z from "zod";

export const memberFormSchema = z.object({
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
  dateOfBirth: z.date().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  membershipPlan: z.enum(['Monthly', 'Quarterly', 'Yearly']).optional(),
  trainerAssigned: z.string().optional(),
  workoutGoals: z.string().optional(),
  medicalConditions: z.string().optional(),
  preferredWorkoutTime: z.string().array().optional(),
  paymentStatus: z.string().optional(),
  discountsUsed: z.string().optional(),
  notes: z.string().optional(),
  profilePicture: z.string().optional(),
  nfcCardId: z.string().optional(),
  fingerprintId: z.string().optional(),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;
