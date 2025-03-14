
import { Member, MemberFormAction } from "@/types/memberTypes";
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { useFormState } from "./form/useFormState";
import { useFormSubmission } from "./form/useFormSubmission";
import { useEffect } from "react";

export const useAddMemberForm = (
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => Promise<boolean> | boolean,
  isCreating: boolean,
  isOpen: boolean
) => {
  console.log("Initializing useAddMemberForm hook", { isCreating, isOpen });
  const form = useFormState(isOpen);
  const { isSubmitting, submitForm } = useFormSubmission(onAddMember, isCreating);

  // Add diagnostic logging for form values
  useEffect(() => {
    console.log("Form state updated in useAddMemberForm");
  }, [form.formState]);

  const onSubmit = async (values: MemberFormValues): Promise<boolean> => {
    console.log("useAddMemberForm.onSubmit called with values:", values);
    try {
      const result = await submitForm(values);
      console.log("submitForm result:", result);
      return result;
    } catch (error) {
      console.error("Error in useAddMemberForm.onSubmit:", error);
      return false;
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
