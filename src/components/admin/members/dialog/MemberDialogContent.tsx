import React from "react";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Control, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../form/MemberFormSchema";

// Import all form section components
import BasicInfoFields from "../form/BasicInfoFields";
import MembershipDetailsFields from "../form/MembershipDetailsFields";
import DateOfBirthField from "../form/DateOfBirthField";
import GenderField from "../form/GenderField";
import AddressField from "../form/AddressField";
import EmergencyContactField from "../form/EmergencyContactField";
import AuthenticationFields from "../form/AuthenticationFields";
import AdditionalInfoFields from "../form/AdditionalInfoFields";
import CompanyMembershipFields from "../form/CompanyMembershipFields";
import IndividualCompanyLinkField from "../form/IndividualCompanyLinkField";
import AuthenticationSetupFields from "../form/AuthenticationSetupFields";

interface MemberDialogContentProps {
  form: UseFormReturn<z.infer<typeof memberFormSchema>>;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: z.infer<typeof memberFormSchema>) => void;
}

const MemberDialogContent = ({ form, isSubmitting, onClose, onSubmit }: MemberDialogContentProps) => {
  console.log("Rendering MemberDialogContent, isSubmitting:", isSubmitting);
  const membershipCategory = form.watch("membershipCategory");

  const handleFormSubmit = (values: z.infer<typeof memberFormSchema>) => {
    try {
      console.log("Form submit handler called with values:", values);
      onSubmit(values);
    } catch (error) {
      console.error("Error in form submit handler:", error);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogDescription>
          Create a new member profile by filling out the form below.
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Membership Type Section */}
          <MembershipTypeSection control={form.control} />
          
          {/* Basic Information Section */}
          <BasicInfoSection control={form.control} />
          
          {/* Conditional Fields based on Membership Category */}
          {membershipCategory === "Company" ? (
            <CompanyMembershipFields 
              control={form.control} 
              visible={membershipCategory === "Company"} 
            />
          ) : (
            <PersonalDetailsSection 
              control={form.control} 
              membershipCategory={membershipCategory} 
            />
          )}
          
          {/* Authentication Setup Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Account & Login Setup</h3>
            <AuthenticationSetupFields control={form.control} />
          </div>
          
          {/* Authentication Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Gym Access Authentication</h3>
            <AuthenticationFields control={form.control} />
          </div>
          
          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Information</h3>
            <AdditionalInfoFields control={form.control} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-gym-orange hover:bg-gym-orange/90"
            >
              {isSubmitting ? "Submitting..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

// Membership Type Section Component
const MembershipTypeSection = ({ control }: {control: Control<z.infer<typeof memberFormSchema>>}) => {
  return (
    <div className="space-y-4">
      <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
        <h3 className="text-sm font-medium text-orange-800">Membership Category</h3>
        <p className="text-xs text-orange-700 mt-1">
          Choose whether this is an individual membership or a company membership.
          Company memberships include additional fields for corporate billing and employee management.
        </p>
      </div>
      <MembershipDetailsFields control={control} />
    </div>
  );
};

// Basic Information Section Component
const BasicInfoSection = ({ control }: {control: Control<z.infer<typeof memberFormSchema>>}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Basic Information</h3>
      <BasicInfoFields control={control} />
    </div>
  );
};

// Personal Details Section Component
interface PersonalDetailsSectionProps {
  control: Control<z.infer<typeof memberFormSchema>>;
  membershipCategory: string;
}

const PersonalDetailsSection = ({ control, membershipCategory }: PersonalDetailsSectionProps) => {
  return (
    <>
      {/* Personal Details Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateOfBirthField control={control} />
          <GenderField control={control} />
        </div>
        <AddressField control={control} />
        <EmergencyContactField control={control} />
      </div>
      
      {/* Individual Company Link */}
      <IndividualCompanyLinkField 
        control={control} 
        visible={membershipCategory === "Individual"} 
      />
    </>
  );
};

export default MemberDialogContent;
