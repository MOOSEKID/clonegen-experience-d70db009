
import React, { useState } from "react";
import { FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { commonSpecializations } from "@/utils/trainerUtils";

interface TrainerAddSpecializationsFieldProps {
  selectedSpecializations: string[];
  onAddSpecialization: (spec: string) => void;
  onRemoveSpecialization: (spec: string) => void;
}

const TrainerAddSpecializationsField: React.FC<TrainerAddSpecializationsFieldProps> = ({
  selectedSpecializations,
  onAddSpecialization,
  onRemoveSpecialization
}) => {
  const [newSpecialization, setNewSpecialization] = useState("");
  
  const handleAddSpecialization = () => {
    if (newSpecialization.trim() === "") return;
    onAddSpecialization(newSpecialization);
    setNewSpecialization("");
  };

  return (
    <FormItem>
      <FormLabel>Specializations</FormLabel>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedSpecializations.map((spec, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {spec}
            <button
              type="button"
              onClick={() => onRemoveSpecialization(spec)}
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
        
        <Select onValueChange={(value) => onAddSpecialization(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select from common specializations" />
          </SelectTrigger>
          <SelectContent>
            {commonSpecializations
              .filter(spec => !selectedSpecializations.includes(spec))
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
  );
};

export default TrainerAddSpecializationsField;
