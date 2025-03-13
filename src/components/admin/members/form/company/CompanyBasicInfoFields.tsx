
import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../MemberFormSchema";

// Import the individual field components
import CompanyNameField from "./fields/CompanyNameField";
import CompanyContactField from "./fields/CompanyContactField";
import CompanyEmailField from "./fields/CompanyEmailField";
import CompanyPhoneField from "./fields/CompanyPhoneField";
import CompanyAddressField from "./fields/CompanyAddressField";
import CompanyTINField from "./fields/CompanyTINField";
import CompanyLogoField from "./fields/CompanyLogoField";

interface CompanyBasicInfoFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyBasicInfoFields = ({ control }: CompanyBasicInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CompanyNameField control={control} />
        <CompanyContactField control={control} />
        <CompanyEmailField control={control} />
        <CompanyPhoneField control={control} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CompanyAddressField control={control} />
        <CompanyTINField control={control} />
      </div>

      <CompanyLogoField control={control} />
    </>
  );
};

export default CompanyBasicInfoFields;
