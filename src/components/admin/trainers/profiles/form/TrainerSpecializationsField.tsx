
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { commonSpecializations } from "@/utils/trainerUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TrainerSpecializationsFieldProps {
  form: UseFormReturn<any>;
}

const TrainerSpecializationsField: React.FC<TrainerSpecializationsFieldProps> = ({ form }) => {
  const [newSpecialization, setNewSpecialization] = useState("");
  
  // Get the current specialties value
  const specialties = form.watch("specialties") || [];
  
  const handleAddSpecialization = () => {
    if (newSpecialization.trim() === "") return;
    
    // Check if it already exists
    if (!specialties.includes(newSpecialization)) {
      const updatedSpecialties = [...specialties, newSpecialization];
      form.setValue("specialties", updatedSpecialties, { shouldValidate: true });
      setNewSpecialization("");
    }
  };
  
  const handleRemoveSpecialization = (spec: string) => {
    const updatedSpecialties = specialties.filter((s: string) => s !== spec);
    form.setValue("specialties", updatedSpecialties, { shouldValidate: true });
  };
  
  // Handle adding from dropdown
  const handleSelectSpecialization = (value: string) => {
    if (!specialties.includes(value)) {
      const updatedSpecialties = [...specialties, value];
      form.setValue("specialties", updatedSpecialties, { shouldValidate: true });
    }
  };
  
  return (
    <FormField
      control={form.control}
      name="specialties"
      render={() => (
        <FormItem>
          <FormLabel>Specializations</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {specialties.map((spec: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {spec}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialization(spec)}
                  className="rounded-full h-4 w-4 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <Input
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add custom specialization"
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpecialization();
                  }
                }}
              />
              <Button type="button" onClick={handleAddSpecialization} variant="outline">
                Add
              </Button>
            </div>
            
            <Select onValueChange={handleSelectSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Select from common specializations" />
              </SelectTrigger>
              <SelectContent>
                {commonSpecializations
                  .filter(spec => !specialties.includes(spec))
                  .map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          <FormDescription>
            Add specializations from the list or create custom ones.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TrainerSpecializationsField;
