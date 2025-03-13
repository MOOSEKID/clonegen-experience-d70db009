
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Building } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface IndividualCompanyLinkFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
  visible: boolean;
}

const IndividualCompanyLinkField = ({ control, visible }: IndividualCompanyLinkFieldProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg border">
      <FormField
        control={control}
        name="linkedToCompany"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Link to Company</FormLabel>
              <FormDescription>
                Link this individual to a company membership plan
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      
      {/* Show company name field only if linkedToCompany is true */}
      {control._formValues.linkedToCompany && (
        <FormField
          control={control}
          name="linkedCompanyName"
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
      )}
    </div>
  );
};

export default IndividualCompanyLinkField;
