
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyContactFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyContactField = ({ control }: CompanyContactFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyContactPerson"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <User size={16} /> Contact Person
          </FormLabel>
          <FormControl>
            <Input placeholder="Enter contact person name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyContactField;
