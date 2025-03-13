
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../../MemberFormSchema";

interface CompanyLogoFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyLogoField = ({ control }: CompanyLogoFieldProps) => {
  return (
    <FormField
      control={control}
      name="companyLogo"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <UploadCloud size={16} /> Company Logo
          </FormLabel>
          <FormControl>
            <Input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                // In a real app, you would upload the file to a server
                // and get back a URL to store
                const file = e.target.files?.[0];
                if (file) {
                  // Simulating a file URL for demonstration
                  field.onChange(`company_logo_${file.name}`);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CompanyLogoField;
