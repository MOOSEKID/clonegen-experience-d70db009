
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyNameFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyNameField = ({ control }: CompanyNameFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyName"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Building size={16} /> Company Name
          </FormLabel>
          <FormControl>
            <Input placeholder="Enter company name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyNameField;
