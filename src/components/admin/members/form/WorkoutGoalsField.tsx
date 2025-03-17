
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface WorkoutGoalsFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const WorkoutGoalsField = ({ control }: WorkoutGoalsFieldProps) => {
  return (
    <FormField
      control={control}
      name="workoutGoals"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Workout Goals</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value || undefined} 
            defaultValue={undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select workout goal" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Weight Loss">Weight Loss</SelectItem>
              <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
              <SelectItem value="Endurance">Endurance</SelectItem>
              <SelectItem value="General Fitness">General Fitness</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WorkoutGoalsField;
