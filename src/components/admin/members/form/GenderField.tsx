
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface GenderFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const GenderField = ({ control }: GenderFieldProps) => {
  return (
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup
              className="flex space-x-4"
              value={field.value}
              onValueChange={field.onChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="male" />
                <label htmlFor="male" className="text-sm">Male</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="female" />
                <label htmlFor="female" className="text-sm">Female</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="other" />
                <label htmlFor="other" className="text-sm">Other</label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GenderField;
