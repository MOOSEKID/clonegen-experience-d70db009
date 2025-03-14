
import React, { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { z } from "zod";
import { memberFormSchema } from "./MemberFormSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Trainer {
  id: string;
  name: string;
  specialization: string[];
}

interface TrainerDropdownFieldProps {
  control: Control<z.infer<typeof memberFormSchema>>;
}

const TrainerDropdownField = ({ control }: TrainerDropdownFieldProps) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('trainers')
          .select('id, name, specialization')
          .eq('status', 'Active');
          
        if (error) {
          throw error;
        }
        
        setTrainers(data || []);
      } catch (error) {
        console.error('Error fetching trainers:', error);
        toast.error('Failed to load trainers');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrainers();
  }, []);
  
  return (
    <FormField
      control={control}
      name="trainerAssigned"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Trainer Assigned</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value || undefined}
            defaultValue={undefined}
            disabled={isLoading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? "Loading trainers..." : "Select a trainer"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.name}>
                  {trainer.name} - {trainer.specialization ? trainer.specialization.join(', ') : 'General'}
                </SelectItem>
              ))}
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TrainerDropdownField;
