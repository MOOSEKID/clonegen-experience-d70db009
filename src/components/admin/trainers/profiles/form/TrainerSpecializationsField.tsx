
import React, { useState } from "react";
import { FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TrainerFormValues } from "../TrainerEditForm";

interface TrainerSpecializationsFieldProps {
  form: UseFormReturn<TrainerFormValues>;
}

const TrainerSpecializationsField: React.FC<TrainerSpecializationsFieldProps> = ({ form }) => {
  const [newSpecialization, setNewSpecialization] = useState("");

  const addSpecialization = () => {
    if (newSpecialization.trim() === "") return;
    
    const currentSpecs = form.getValues("specialization") || [];
    if (!currentSpecs.includes(newSpecialization)) {
      form.setValue("specialization", [...currentSpecs, newSpecialization]);
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (spec: string) => {
    const currentSpecs = form.getValues("specialization") || [];
    form.setValue(
      "specialization",
      currentSpecs.filter((s) => s !== spec)
    );
  };

  return (
    <FormItem>
      <FormLabel>Specializations</FormLabel>
      <div className="flex flex-wrap gap-2 mb-2">
        {form.getValues("specialization")?.map((spec, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {spec}
            <button
              type="button"
              onClick={() => removeSpecialization(spec)}
              className="rounded-full h-4 w-4 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newSpecialization}
          onChange={(e) => setNewSpecialization(e.target.value)}
          placeholder="Add specialization"
          className="flex-grow"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSpecialization();
            }
          }}
        />
        <Button type="button" onClick={addSpecialization} variant="outline">
          Add
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default TrainerSpecializationsField;
