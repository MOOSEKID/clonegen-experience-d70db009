
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyTINFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyTINField = ({ control }: CompanyTINFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyTIN"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <FileText size={16} /> Tax ID Number (TIN)
          </FormLabel>
          <FormControl>
            <Input placeholder="Enter company TIN number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyTINField;
