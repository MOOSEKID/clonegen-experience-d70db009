
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";
import WorkoutGoalsField from "./WorkoutGoalsField";
import PreferredWorkoutTimeField from "./PreferredWorkoutTimeField";

interface AdditionalInfoFieldsProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const AdditionalInfoFields = ({ control }: AdditionalInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="trainerAssigned"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trainer Assigned</FormLabel>
            <FormControl>
              <Input placeholder="Assigned trainer name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
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
