
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Contact, Phone } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface EmergencyContactFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const EmergencyContactField = ({ control }: EmergencyContactFieldProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="emergencyContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Contact size={16} /> Emergency Contact Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Emergency contact name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="emergencyContactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Phone size={16} /> Emergency Contact Phone
            </FormLabel>
            <FormControl>
              <Input placeholder="+250788123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EmergencyContactField;
