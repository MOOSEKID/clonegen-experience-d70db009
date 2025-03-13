
import React from "react";
import { User, Mail, Phone } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, useWatch } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface BasicInfoFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const BasicInfoFields = ({ control }: BasicInfoFieldsProps) => {
  const membershipCategory = useWatch({
    control,
    name: "membershipCategory",
    defaultValue: "Individual"
  });

  const isCompany = membershipCategory === "Company";
  
  // If it's a company membership, we show information banner instead of individual fields
  if (isCompany) {
    return (
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800">Company Membership</h4>
        <p className="text-xs text-blue-600 mt-1">
          Individual details are not required for company memberships. Please fill in the company details below.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><User size={16} /> Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><Mail size={16} /> Email</FormLabel>
            <FormControl>
              <Input placeholder="john.doe@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2"><Phone size={16} /> Phone</FormLabel>
            <FormControl>
              <Input placeholder="+250788123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="membershipType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Membership Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select membership type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
