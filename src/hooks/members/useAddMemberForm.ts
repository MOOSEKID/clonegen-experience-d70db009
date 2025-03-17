
import { Member, MemberFormAction } from "@/types/memberTypes";
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { useFormState } from "./form/useFormState";
import { useFormSubmission } from "./form/useFormSubmission";
import { useEffect } from "react";
import { toast } from "sonner";

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

  // Reset form errors when dialog opens
  useEffect(() => {
    if (isOpen) {
      console.log("Dialog opened - clearing form errors");
      form.clearErrors();
    }
  }, [isOpen, form]);

  const onSubmit = async (values: MemberFormValues): Promise<boolean> => {
    console.log("useAddMemberForm.onSubmit called with values:", values);
    try {
      // Validate select fields don't have empty string values
      const selectFields = [
        { name: 'gender', category: 'Individual' },
        { name: 'workoutGoals', category: 'Individual' },
        { name: 'companyMembershipPlan', category: 'Company' },
        { name: 'billingCycle', category: 'Company' },
        { name: 'paymentMode', category: 'Company' },
        { name: 'subscriptionModel', category: 'Company' }
      ];
      
      // Ensure required values are present before submission
      if (values.membershipCategory === 'Individual' && (!values.name || !values.email)) {
        const missingFields = [];
        if (!values.name) missingFields.push('Name');
        if (!values.email) missingFields.push('Email');
        
        const errorMessage = `Please fill in all required fields: ${missingFields.join(', ')}`;
        console.error(errorMessage);
        toast.error(errorMessage);
        return false;
      } else if (values.membershipCategory === 'Company' && (!values.companyName || !values.companyEmail)) {
        const missingFields = [];
        if (!values.companyName) missingFields.push('Company Name');
        if (!values.companyEmail) missingFields.push('Company Email');
        
        const errorMessage = `Please fill in all required fields: ${missingFields.join(', ')}`;
        console.error(errorMessage);
        toast.error(errorMessage);
        return false;
      }
      
      // Replace empty strings with undefined for select fields
      selectFields.forEach(field => {
        if (values.membershipCategory === field.category && values[field.name as keyof MemberFormValues] === '') {
          (values as any)[field.name] = undefined;
        }
      });
      
      // Process form submission
      const result = await submitForm(values);
      console.log("submitForm result:", result);
      return result;
    } catch (error) {
      console.error("Error in useAddMemberForm.onSubmit:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
      return false;
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
