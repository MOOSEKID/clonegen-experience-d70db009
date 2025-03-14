
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
              placeholder="Trainer biography"
              className="min-h-[100px]"
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
