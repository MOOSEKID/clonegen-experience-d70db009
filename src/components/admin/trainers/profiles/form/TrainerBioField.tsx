
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { TrainerFormValues } from "../TrainerEditForm";

interface TrainerBioFieldProps {
  form: UseFormReturn<TrainerFormValues>;
}

const TrainerBioField: React.FC<TrainerBioFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Trainer's biography and experience"
              className="resize-none min-h-24"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TrainerBioField;
