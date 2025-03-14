
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import { Control, useWatch, useFormContext } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface MembershipDetailsFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const MembershipDetailsFields = ({ control }: MembershipDetailsFieldsProps) => {
  const { setValue, getValues, watch } = useFormContext();
  
  // Watch for changes in membershipCategory and companyContactPerson
  const membershipCategory = useWatch({
    control,
    name: "membershipCategory",
  });
  
  const companyContactPerson = useWatch({
    control,
    name: "companyContactPerson",
  });
  
  const companyEmail = useWatch({
    control,
    name: "companyEmail",
  });
  
  const companyPhone = useWatch({
    control,
    name: "companyPhone",
  });
  
  // Effect to handle auto-filling or clearing individual fields when toggling membership category
  useEffect(() => {
    if (membershipCategory === 'Company') {
      // For company membership, clear individual fields
      setValue('name', '');
      setValue('email', '');
      setValue('phone', '');
      
      // Set admin setup required flag
      setValue('adminSetupRequired', true);
      setValue('hasAdminUser', false);
    }
  }, [membershipCategory, setValue]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="membershipCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Category</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || "Individual"}
                value={field.value || "Individual"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="membershipPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Plan</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || "Monthly"}
                value={field.value || "Monthly"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership plan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {membershipCategory === 'Company' && (
        <div className="bg-amber-50 p-3 rounded-md border border-amber-200 flex items-start gap-2">
          <AlertCircle className="text-amber-600 mt-0.5" size={16} />
          <div>
            <p className="text-sm text-amber-800 font-medium">Admin User Setup</p>
            <p className="text-xs text-amber-700 mt-0.5">
              You can assign an admin user for this company after registration. 
              The admin will have access to manage staff, view invoices, and track attendance.
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || "Active"}
                value={field.value || "Active"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="paymentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || "Pending"}
                value={field.value || "Pending"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="discountsUsed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discounts Used</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value || "No"}
              value={field.value || "No"}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select if discounts used" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MembershipDetailsFields;
