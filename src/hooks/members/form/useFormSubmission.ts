
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
    if (isSubmitting || isCreating) {
      console.log("Submission prevented - already submitting or creating:", isSubmitting, isCreating);
      return false;
    }
    
    setIsSubmitting(true);
    try {
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
      }
      
      return result;
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member", {
        description: "Please try again or contact support."
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
