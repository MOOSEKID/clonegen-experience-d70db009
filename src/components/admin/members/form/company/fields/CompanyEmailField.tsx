
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyEmailFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyEmailField = ({ control }: CompanyEmailFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyEmail"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Mail size={16} /> Company Email
          </FormLabel>
          <FormControl>
            <Input placeholder="company@example.com" type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyEmailField;
