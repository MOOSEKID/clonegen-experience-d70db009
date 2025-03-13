
import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

// Import the smaller component sections
import CompanyBasicInfoFields from "./company/CompanyBasicInfoFields";
import CompanyMembershipPlanFields from "./company/CompanyMembershipPlanFields";
import CompanyBillingFields from "./company/CompanyBillingFields";
import CompanyDiscountFields from "./company/CompanyDiscountFields";
import PerSignatureNotice from "./company/PerSignatureNotice";

interface CompanyMembershipFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
  visible: boolean;
}

const CompanyMembershipFields = ({ control, visible }: CompanyMembershipFieldsProps) => {
  if (!visible) return null;

  const subscriptionModel = control._formValues.subscriptionModel || 'Fixed Fee';

  return (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg border">
      <h3 className="text-sm font-medium">Company Details</h3>
      
      {/* Company Basic Information */}
      <CompanyBasicInfoFields control={control} />
      
      {/* Company Membership Plan */}
      <CompanyMembershipPlanFields control={control} />
      
      {/* Company Billing Information */}
      <CompanyBillingFields control={control} />
      
      {/* Corporate Discount Settings */}
      <CompanyDiscountFields control={control} />
      
      {/* Per-Signature Model Notice */}
      <PerSignatureNotice visible={subscriptionModel === 'Per-Signature'} />
    </div>
  );
};

export default CompanyMembershipFields;
