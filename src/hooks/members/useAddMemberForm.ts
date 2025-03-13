
import { Member, MemberFormAction } from "@/types/memberTypes";
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { useFormState } from "./form/useFormState";
import { useFormSubmission } from "./form/useFormSubmission";

export const useAddMemberForm = (
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => Promise<boolean> | boolean,
  isCreating: boolean,
  isOpen: boolean
) => {
  const form = useFormState(isOpen);
  const { isSubmitting, submitForm } = useFormSubmission(onAddMember, isCreating);

  const onSubmit = async (values: MemberFormValues): Promise<boolean> => {
    return await submitForm(values);
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
