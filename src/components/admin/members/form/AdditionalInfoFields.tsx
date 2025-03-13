
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";
import WorkoutGoalsField from "./WorkoutGoalsField";
import PreferredWorkoutTimeField from "./PreferredWorkoutTimeField";
import TrainerDropdownField from "./TrainerDropdownField";

interface AdditionalInfoFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const AdditionalInfoFields = ({ control }: AdditionalInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <TrainerDropdownField control={control} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WorkoutGoalsField control={control} />
        <PreferredWorkoutTimeField control={control} />
      </div>
      
      <FormField
        control={control}
        name="medicalConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medical Conditions</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any medical conditions or limitations"
                className="resize-none"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Any additional notes about the member"
                className="resize-none"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AdditionalInfoFields;
