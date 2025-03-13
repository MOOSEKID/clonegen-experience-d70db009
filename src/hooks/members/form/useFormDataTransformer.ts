
import { MemberFormValues } from "@/components/admin/members/form/MemberFormSchema";
import { Member, MemberFormAction } from "@/types/memberTypes";

export const useFormDataTransformer = () => {
  // Handle authentication setup data
  const getAuthSetupData = (values: MemberFormValues) => {
    return {
      generateUsername: values.generateUsername,
      username: values.username,
      generateTemporaryPassword: values.generateTemporaryPassword,
      temporaryPassword: values.temporaryPassword,
      sendCredentials: values.sendCredentials,
    };
  };

  // Handle common membership data
  const getCommonMembershipData = (values: MemberFormValues) => {
    return {
      membershipCategory: values.membershipCategory,
      membershipType: values.membershipType,
      status: values.status,
      membershipPlan: values.membershipPlan,
      paymentStatus: values.paymentStatus,
      discountsUsed: values.discountsUsed,
      notes: values.notes,
      profilePicture: values.profilePicture,
      nfcCardId: values.nfcCardId,
      fingerprintId: values.fingerprintId,
    };
  };

  // Handle individual-specific data
  const getIndividualMemberData = (values: MemberFormValues) => {
    const memberData: Partial<Member> = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      address: values.address,
      trainerAssigned: values.trainerAssigned,
      workoutGoals: values.workoutGoals,
      medicalConditions: values.medicalConditions,
      preferredWorkoutTime: values.preferredWorkoutTime,
    };

    // Process date of birth
    if (values.dateOfBirth) {
      memberData.dateOfBirth = values.dateOfBirth.toISOString().split('T')[0];
    }

    // Format emergency contact information
    memberData.emergencyContact = formatEmergencyContactInfo(
      values.emergencyContact,
      values.emergencyContactPhone
    );

    // Add company linking data if applicable
    if (values.linkedToCompany) {
      memberData.linkedToCompany = values.linkedToCompany;
      memberData.linkedCompanyName = values.linkedCompanyName;
    }

    return memberData;
  };

  // Helper function to format emergency contact info
  const formatEmergencyContactInfo = (
    contactName?: string,
    contactPhone?: string
  ): string | undefined => {
    if (!contactName) return undefined;
    
    return contactPhone 
      ? `${contactName} (${contactPhone})` 
      : contactName;
  };

  // Handle company-specific data
  const getCompanyMemberData = (values: MemberFormValues) => {
    const memberData: Partial<Member> = {
      companyName: values.companyName,
      companyContactPerson: values.companyContactPerson,
      companyEmail: values.companyEmail,
      companyPhone: values.companyPhone,
      companyAddress: values.companyAddress,
      companyTIN: values.companyTIN,
      companyLogo: values.companyLogo,
      companyMembershipPlan: values.companyMembershipPlan,
      membersCovered: values.membersCovered,
      billingCycle: values.billingCycle,
      paymentMode: values.paymentMode,
      subscriptionModel: values.subscriptionModel,
      corporateDiscount: values.corporateDiscount,
      
      // Use company name as the name field
      name: values.companyName,
      email: values.companyEmail,
      phone: values.companyPhone,
      
      // Set admin setup flag
      adminSetupRequired: values.adminSetupRequired,
      hasAdminUser: values.hasAdminUser,
    };

    return memberData;
  };

  // Main transformation function
  const transformFormToMemberData = (values: MemberFormValues): Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction => {
    // Get common data and auth setup data
    const memberData = {
      ...getCommonMembershipData(values),
      ...getAuthSetupData(values),
    } as Omit<Member, "id" | "startDate" | "endDate" | "lastCheckin"> & MemberFormAction;
    
    // Add fields based on membership category
    if (values.membershipCategory === 'Individual') {
      Object.assign(memberData, getIndividualMemberData(values));
    } else {
      Object.assign(memberData, getCompanyMemberData(values));
    }
    
    return memberData;
  };

  return {
    transformFormToMemberData
  };
};
