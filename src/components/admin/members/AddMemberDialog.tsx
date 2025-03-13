
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Member } from "@/types/memberTypes";
import { memberFormSchema, MemberFormValues } from "./form/MemberFormSchema";

// Import all form field components
import BasicInfoFields from "./form/BasicInfoFields";
import MembershipDetailsFields from "./form/MembershipDetailsFields";
import DateOfBirthField from "./form/DateOfBirthField";
import GenderField from "./form/GenderField";
import AddressField from "./form/AddressField";
import EmergencyContactField from "./form/EmergencyContactField";
import AuthenticationFields from "./form/AuthenticationFields";
import AdditionalInfoFields from "./form/AdditionalInfoFields";
import CompanyMembershipFields from "./form/CompanyMembershipFields";
import IndividualCompanyLinkField from "./form/IndividualCompanyLinkField";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">) => void;
}

const AddMemberDialog = ({ isOpen, onClose, onAddMember }: AddMemberDialogProps) => {
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      // Basic Information
      name: "",
      email: "",
      phone: "+250",
      membershipType: "Standard",
      status: "Active",
      
      // Personal Details
      dateOfBirth: undefined,
      gender: undefined,
      address: "",
      emergencyContact: "",
      emergencyContactPhone: "",
      
      // Membership Details
      membershipCategory: "Individual",
      membershipPlan: "Monthly",
      
      // Additional Information
      trainerAssigned: "",
      workoutGoals: undefined,
      medicalConditions: "",
      preferredWorkoutTime: [],
      paymentStatus: "Pending",
      discountsUsed: "No",
      notes: "",
      
      // Authentication
      profilePicture: "",
      nfcCardId: "",
      fingerprintId: "",
      
      // Company Membership Fields
      companyName: "",
      companyContactPerson: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
      companyTIN: "",
      companyLogo: "",
      companyMembershipPlan: undefined,
      membersCovered: undefined,
      billingCycle: undefined,
      paymentMode: undefined,
      subscriptionModel: undefined,
      corporateDiscount: {
        type: undefined,
        value: undefined
      },
      
      // Individual linking to company
      linkedToCompany: false,
      linkedCompanyName: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const membershipCategory = form.watch("membershipCategory");
  
  const onSubmit = async (values: MemberFormValues) => {
    setIsSubmitting(true);
    try {
      // Transform the data for the onAddMember function
      const memberData = {
        name: values.name, // Required field
        email: values.email, // Required field
        phone: values.phone, // Required field
        membershipType: values.membershipType, // Required field
        status: values.status, // Required field with default 'Active'
        membershipCategory: values.membershipCategory,
        // Convert Date object to string format if it exists
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString().split('T')[0] : undefined,
        gender: values.gender,
        address: values.address,
        emergencyContact: values.emergencyContact 
          ? (values.emergencyContactPhone 
              ? `${values.emergencyContact} (${values.emergencyContactPhone})` 
              : values.emergencyContact)
          : undefined,
        membershipPlan: values.membershipPlan,
        trainerAssigned: values.trainerAssigned,
        workoutGoals: values.workoutGoals,
        medicalConditions: values.medicalConditions,
        preferredWorkoutTime: values.preferredWorkoutTime,
        paymentStatus: values.paymentStatus,
        discountsUsed: values.discountsUsed,
        notes: values.notes,
        profilePicture: values.profilePicture,
        nfcCardId: values.nfcCardId,
        fingerprintId: values.fingerprintId,
      } as Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin">;
      
      // Add company-specific fields if membershipCategory is 'Company'
      if (values.membershipCategory === 'Company') {
        memberData.companyName = values.companyName;
        memberData.companyContactPerson = values.companyContactPerson;
        memberData.companyEmail = values.companyEmail;
        memberData.companyPhone = values.companyPhone;
        memberData.companyAddress = values.companyAddress;
        memberData.companyTIN = values.companyTIN;
        memberData.companyLogo = values.companyLogo;
        memberData.companyMembershipPlan = values.companyMembershipPlan;
        memberData.membersCovered = values.membersCovered;
        memberData.billingCycle = values.billingCycle;
        memberData.paymentMode = values.paymentMode;
        memberData.subscriptionModel = values.subscriptionModel;
        memberData.corporateDiscount = values.corporateDiscount;
      }
      
      // Add individual-to-company linking fields if appropriate
      if (values.membershipCategory === 'Individual' && values.linkedToCompany) {
        memberData.linkedToCompany = values.linkedToCompany;
        memberData.linkedCompanyName = values.linkedCompanyName;
      }
      
      onAddMember(memberData);
      onClose();
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Create a new member profile by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Membership Type Selection */}
            <div className="space-y-4">
              <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                <h3 className="text-sm font-medium text-orange-800">Membership Category</h3>
                <p className="text-xs text-orange-700 mt-1">
                  Choose whether this is an individual membership or a company membership.
                  Company memberships include additional fields for corporate billing and employee management.
                </p>
              </div>
              <MembershipDetailsFields control={form.control} />
            </div>
            
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Basic Information</h3>
              <BasicInfoFields control={form.control} />
            </div>
            
            {/* Conditional Fields based on Membership Category */}
            {membershipCategory === "Company" ? (
              <CompanyMembershipFields 
                control={form.control} 
                visible={membershipCategory === "Company"} 
              />
            ) : (
              <>
                {/* Personal Details Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateOfBirthField control={form.control} />
                    <GenderField control={form.control} />
                  </div>
                  <AddressField control={form.control} />
                  <EmergencyContactField control={form.control} />
                </div>
                
                {/* Individual Company Link */}
                <IndividualCompanyLinkField 
                  control={form.control} 
                  visible={membershipCategory === "Individual"} 
                />
              </>
            )}
            
            {/* Authentication Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Authentication</h3>
              <AuthenticationFields control={form.control} />
            </div>
            
            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Additional Information</h3>
              <AdditionalInfoFields control={form.control} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
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
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
