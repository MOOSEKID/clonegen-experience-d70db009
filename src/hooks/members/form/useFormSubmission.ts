
import { useState } from "react";
import { Member, MemberFormAction } from "@/types/memberTypes";
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { toast } from "sonner";

export const useFormSubmission = (
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => Promise<boolean> | boolean,
  isCreating: boolean
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (values: MemberFormValues): Promise<boolean> => {
    try {
      console.log("Starting form submission with values:", values);
      setIsSubmitting(true);

      // Transform form values to Member/MemberFormAction format
      const memberData: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction = {
        name: values.name,
        email: values.email,
        phone: values.phone || "",
        membershipType: values.membershipType || "Standard",
        membershipCategory: values.membershipCategory || "Individual",
        
        // Authentication details
        generateUsername: values.generateUsername,
        username: values.username,
        generateTemporaryPassword: values.generateTemporaryPassword,
        temporaryPassword: values.temporaryPassword,
        sendCredentials: values.sendCredentials,
        
        // Additional fields based on membership category
        ...(values.membershipCategory === "Individual" ? {
          dateOfBirth: values.dateOfBirth,
          gender: values.gender,
          address: values.address,
          emergencyContact: values.emergencyContact,
          linkedToCompany: values.linkedToCompany,
          linkedCompanyName: values.linkedCompanyName,
          linkedCompanyId: values.linkedCompanyId,
        } : {}),
        
        ...(values.membershipCategory === "Company" ? {
          companyName: values.companyName,
          companyEmail: values.companyEmail,
          companyPhone: values.companyPhone,
          companyAddress: values.companyAddress,
          companyLogo: values.companyLogo,
          companyTIN: values.companyTIN,
          subscriptionModel: values.subscriptionModel,
          billingCycle: values.billingCycle,
          discountRate: values.discountRate,
          useGroupDiscount: values.useGroupDiscount,
        } : {}),
        
        // Auth-related fields
        nfcCardId: values.nfcCardId,
        fingerprintId: values.fingerprintId,
        
        // Additional information
        trainerAssigned: values.trainerAssigned,
        workoutGoals: values.workoutGoals,
        preferredWorkoutTime: values.preferredWorkoutTime,
        medicalConditions: values.medicalConditions,
        notes: values.notes,
        
        // Membership plan
        membershipPlan: values.membershipPlan,
      };

      console.log("Transformed member data:", memberData);
      
      const result = await onAddMember(memberData);
      console.log("onAddMember result:", result);
      
      if (result) {
        return true;
      } else {
        toast.error("Failed to add member");
        return false;
      }
    } catch (error) {
      console.error("Error in submitForm:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting: isSubmitting || isCreating,
    submitForm,
  };
};
