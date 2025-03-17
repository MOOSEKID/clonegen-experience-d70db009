
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "../MemberFormSchema";

interface CompanyDiscountFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const CompanyDiscountFields = ({ control }: CompanyDiscountFieldsProps) => {
  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-sm font-medium mb-2">Corporate Discount</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="corporateDiscount.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Percent size={16} /> Discount Type
              </FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value || undefined}
                defaultValue={undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Fixed Percentage">Fixed Percentage</SelectItem>
                  <SelectItem value="Tiered">Tiered Pricing</SelectItem>
                  <SelectItem value="Custom">Custom Discount</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="corporateDiscount.value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Value (%)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="e.g. 10 for 10%" 
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CompanyDiscountFields;
