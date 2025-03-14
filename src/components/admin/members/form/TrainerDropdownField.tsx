
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTrainers } from "@/data/trainersData";

interface TrainerDropdownFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const TrainerDropdownField = ({ control }: TrainerDropdownFieldProps) => {
  const trainers = getTrainers();
  
  return (
    <FormField
      control={control}
      name="trainerAssigned"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Trainer Assigned</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value || ""}
            defaultValue=""
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.name}>
                  {trainer.name} - {trainer.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TrainerDropdownField;
