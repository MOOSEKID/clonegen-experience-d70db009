
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyPhoneFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyPhoneField = ({ control }: CompanyPhoneFieldProps) => {
  // Helper function to format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Ensure it starts with + if not empty
    if (value && !value.startsWith('+')) {
      return `+${value}`;
    }
    return value;
  };

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
            <Input 
              placeholder="+250788123456" 
              {...field} 
              value={field.value || "+250"} 
              onChange={(e) => {
                const formattedValue = formatPhoneNumber(e.target.value);
                field.onChange(formattedValue);
              }}
            />
          </FormControl>
          <FormDescription className="text-xs text-muted-foreground">
            Enter phone number in international format (e.g., +250 for Rwanda)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyPhoneField;
