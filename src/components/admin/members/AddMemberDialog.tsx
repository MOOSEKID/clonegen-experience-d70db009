
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Member } from "@/types/memberTypes";
import { memberFormSchema, MemberFormValues } from "./form/MemberFormSchema";
import MemberDialogContent from "./dialog/MemberDialogContent";

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
        <MemberDialogContent 
          form={form} 
          isSubmitting={isSubmitting} 
          onClose={onClose} 
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
