
import React from "react";
import { User, Mail, Phone } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  
  // If it's a company membership, we don't show individual fields
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
            <FormControl>
              <select
                {...field}
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
              >
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
