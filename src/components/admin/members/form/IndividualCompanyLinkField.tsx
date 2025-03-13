
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Percent } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface IndividualCompanyLinkFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
  visible: boolean;
}

const IndividualCompanyLinkField = ({ control, visible }: IndividualCompanyLinkFieldProps) => {
  if (!visible) return null;

  // This would be populated from an API in a real application
  const mockCompanies = [
    { name: "Acme Corporation", id: "acme" },
    { name: "TechCorp Inc.", id: "techcorp" },
    { name: "Global Industries", id: "global" },
    { name: "Local Business Ltd", id: "local" },
  ];

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
        <div className="space-y-4">
          <FormField
            control={control}
            name="linkedCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building size={16} /> Company Name
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockCompanies.map(company => (
                      <SelectItem key={company.id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other (Enter manually)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {control._formValues.linkedCompanyName === "other" && (
            <FormField
              control={control}
              name="linkedCompanyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
            <p className="text-sm text-blue-700">
              <Percent className="inline-block mr-1" size={16} />
              <strong>Automatic Benefits:</strong> Members linked to company plans may receive 
              corporate discounts and special benefits. Attendance will be tracked for corporate reporting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualCompanyLinkField;
