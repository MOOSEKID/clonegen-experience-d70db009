
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { memberFormSchema, MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";

export const useFormState = (isOpen: boolean) => {
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
      
      // Authentication Setup
      generateUsername: true,
      username: "",
      generateTemporaryPassword: true,
      temporaryPassword: "",
      sendCredentials: true,
      
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
      companyPhone: "+250",
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
      
      // Company admin user
      hasAdminUser: false,
      adminSetupRequired: true,
    },
  });

  // Watch for membership category to handle dynamic validation
  const membershipCategory = form.watch("membershipCategory");
  
  // Update validation mode when membership category changes
  useEffect(() => {
    // Clear validation errors when switching between membership types
    form.clearErrors();
  }, [membershipCategory, form]);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      console.log("Form reset triggered due to dialog open state change");
      form.reset();
    }
  }, [isOpen, form]);

  return form;
};
