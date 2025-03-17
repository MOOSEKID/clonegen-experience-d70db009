
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Briefcase, CreditCard } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../MemberFormSchema";

interface CompanyMembershipPlanFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyMembershipPlanFields = ({ control }: CompanyMembershipPlanFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="companyMembershipPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Briefcase size={16} /> Company Plan
            </FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || undefined}
              defaultValue={undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select company plan" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="membersCovered"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Users size={16} /> Members Covered
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Number of members" 
                {...field} 
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                value={field.value || ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CompanyMembershipPlanFields;
