
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyPhoneFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyPhoneField = ({ control }: CompanyPhoneFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyPhone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Phone size={16} /> Company Phone
          </FormLabel>
          <FormControl>
            <Input placeholder="+250788123456" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyPhoneField;
