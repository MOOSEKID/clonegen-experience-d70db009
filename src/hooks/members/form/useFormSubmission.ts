
import { useState } from "react";
import { toast } from "sonner";
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { Member, MemberFormAction } from "@/types/memberTypes";
import { useFormDataTransformer } from "./useFormDataTransformer";

type AddMemberFn = (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => Promise<boolean> | boolean;

export const useFormSubmission = (onAddMember: AddMemberFn, isCreating: boolean) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { transformFormToMemberData } = useFormDataTransformer();

  const submitForm = async (values: MemberFormValues): Promise<boolean> => {
    console.log("Form submission started with values:", values);
    
    // Prevent duplicate submissions
    if (isSubmitting) {
      console.log("Submission prevented - already submitting:", isSubmitting);
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      // Validate required fields to prevent errors
      if (!values.name && values.membershipCategory === 'Individual') {
        toast.error("Member name is required");
        return false;
      }
      
      if (!values.email && values.membershipCategory === 'Individual') {
        toast.error("Email is required");
        return false;
      }
      
      if (!values.companyName && values.membershipCategory === 'Company') {
        toast.error("Company name is required");
        return false;
      }
      
      // Transform the form data to member data
      const memberData = transformFormToMemberData(values);
      console.log("Transformed member data:", memberData);
      
      // Call the onAddMember function provided by the parent
      const result = await Promise.resolve(onAddMember(memberData));
      console.log("Member add result:", result);
      
      if (result) {
        toast.success("Member added successfully", {
          description: "The member has been added to the database."
        });
      } else {
        toast.error("Failed to add member", {
          description: "Please check your data and try again."
        });
      }
      
      return result;
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member", {
        description: (error instanceof Error) ? error.message : "Please try again or contact support."
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm
  };
};
