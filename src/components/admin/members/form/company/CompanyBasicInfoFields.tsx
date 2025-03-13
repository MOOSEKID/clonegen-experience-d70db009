
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, FileText, UploadCloud } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../MemberFormSchema";

interface CompanyBasicInfoFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyBasicInfoFields = ({ control }: CompanyBasicInfoFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <FormField
          control={control}
          name="companyContactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact person name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input placeholder="company@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Phone</FormLabel>
              <FormControl>
                <Input placeholder="+250788123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
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
      </div>

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
    </>
  );
};

export default CompanyBasicInfoFields;
