
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Member, MemberFormAction } from "@/types/memberTypes";
import { memberFormSchema, MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";

export const useAddMemberForm = (
  onAddMember: (member: Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction) => void,
  isCreating: boolean,
  isOpen: boolean
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      form.reset();
    }
  }, [isOpen, form]);
  
  const onSubmit = async (values: MemberFormValues) => {
    // Prevent duplicate submissions
    if (isSubmitting || isCreating) return;
    
    setIsSubmitting(true);
    try {
      // Transform the data for the onAddMember function
      const memberData = {
        membershipCategory: values.membershipCategory,
        membershipType: values.membershipType,
        status: values.status,
        membershipPlan: values.membershipPlan,
        
        // Authentication Setup - these go into MemberFormAction
        generateUsername: values.generateUsername,
        username: values.username,
        generateTemporaryPassword: values.generateTemporaryPassword,
        temporaryPassword: values.temporaryPassword,
        sendCredentials: values.sendCredentials,
      } as Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction;
      
      // Add fields based on membership category
      if (values.membershipCategory === 'Individual') {
        // For Individual membership, include personal details
        memberData.name = values.name!; // Required for individuals
        memberData.email = values.email!; // Required for individuals
        memberData.phone = values.phone!; // Required for individuals
        
        // Convert Date object to string format if it exists
        if (values.dateOfBirth) {
          memberData.dateOfBirth = values.dateOfBirth.toISOString().split('T')[0];
        }
        
        memberData.gender = values.gender;
        memberData.address = values.address;
        memberData.emergencyContact = values.emergencyContact 
          ? (values.emergencyContactPhone 
              ? `${values.emergencyContact} (${values.emergencyContactPhone})` 
              : values.emergencyContact)
          : undefined;
        
        memberData.trainerAssigned = values.trainerAssigned;
        memberData.workoutGoals = values.workoutGoals;
        memberData.medicalConditions = values.medicalConditions;
        memberData.preferredWorkoutTime = values.preferredWorkoutTime;
        
        // Add individual-to-company linking fields if appropriate
        if (values.linkedToCompany) {
          memberData.linkedToCompany = values.linkedToCompany;
          memberData.linkedCompanyName = values.linkedCompanyName;
        }
      } else {
        // For Company membership, include company details
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
        
        // Use company name as the name field
        memberData.name = values.companyName!;
        memberData.email = values.companyEmail;
        memberData.phone = values.companyPhone;
        
        // Set admin setup flag
        memberData.adminSetupRequired = values.adminSetupRequired;
        memberData.hasAdminUser = values.hasAdminUser;
      }
      
      // Common fields for both types
      memberData.paymentStatus = values.paymentStatus;
      memberData.discountsUsed = values.discountsUsed;
      memberData.notes = values.notes;
      memberData.profilePicture = values.profilePicture;
      memberData.nfcCardId = values.nfcCardId;
      memberData.fingerprintId = values.fingerprintId;
      
      onAddMember(memberData);
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member", {
        description: "Please try again or contact support."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit,
  };
};
