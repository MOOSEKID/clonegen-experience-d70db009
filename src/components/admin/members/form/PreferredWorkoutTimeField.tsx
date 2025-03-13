
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";

interface PreferredWorkoutTimeFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

// Define the workout time option type to match the schema
type WorkoutTimeOption = "Morning" | "Afternoon" | "Evening" | "Anytime";

const PreferredWorkoutTimeField = ({ control }: PreferredWorkoutTimeFieldProps) => {
  const timeOptions = [
    { id: "morning", label: "Morning", value: "Morning" as WorkoutTimeOption },
    { id: "afternoon", label: "Afternoon", value: "Afternoon" as WorkoutTimeOption },
    { id: "evening", label: "Evening", value: "Evening" as WorkoutTimeOption },
    { id: "anytime", label: "Anytime", value: "Anytime" as WorkoutTimeOption },
  ];

  return (
    <FormField
      control={control}
      name="preferredWorkoutTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Preferred Workout Time</FormLabel>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {timeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={field.value?.includes(option.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // If "Anytime" is selected, clear other selections
                      if (option.value === "Anytime") {
                        field.onChange(["Anytime"]);
                      } else {
                        // If a specific time is selected, remove "Anytime" if present
                        const filtered = field.value.filter(val => val !== "Anytime");
                        field.onChange([...filtered, option.value]);
                      }
                    } else {
                      field.onChange(field.value.filter(value => value !== option.value));
                    }
                  }}
                />
                <label htmlFor={option.id} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PreferredWorkoutTimeField;
