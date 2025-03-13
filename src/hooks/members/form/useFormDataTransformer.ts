
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { Member, MemberFormAction } from "@/types/memberTypes";

export const useFormDataTransformer = () => {
  const transformFormToMemberData = (values: MemberFormValues): Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction => {
    // Base member data with authentication setup actions
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
    
    return memberData;
  };

  return {
    transformFormToMemberData
  };
};
