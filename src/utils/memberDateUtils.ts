
/**
 * Calculate membership end date based on the plan
 * @param membershipPlan The type of membership plan
 * @param billingCycle Optional billing cycle for company memberships
 * @returns The calculated end date
 */
export const calculateMembershipEndDate = (
  membershipPlan?: string,
  billingCycle?: string
): Date => {
  const endDate = new Date();
  
  // For company memberships with billing cycles
  if (billingCycle) {
    if (billingCycle === "Monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (billingCycle === "Quarterly") {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (billingCycle === "Annually") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }
    return endDate;
  }
  
  // For individual memberships
  if (membershipPlan === "Monthly") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (membershipPlan === "Quarterly") {
    endDate.setMonth(endDate.getMonth() + 3);
  } else if (membershipPlan === "Yearly") {
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    // Default to 1 year for custom plans
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
  
  return endDate;
};
