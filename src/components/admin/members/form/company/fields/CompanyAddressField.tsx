
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyAddressFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyAddressField = ({ control }: CompanyAddressFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <MapPin size={16} /> Company Address
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter company address" 
              className="resize-none"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyAddressField;
