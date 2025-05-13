
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useTrainerFileUpload } from "@/hooks/trainers/useTrainerFileUpload";
import { StaffProfile } from "@/hooks/trainers/types";
import TrainerAddFormFields from "./form/TrainerAddFormFields";
import TrainerAddSpecializationsField from "./form/TrainerAddSpecializationsField";
import TrainerBioField from "./form/TrainerBioField";
import FormActions from "./form/FormActions";

const trainerFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  status: z.string(),
  hire_date: z.string().optional(),
  experience_years: z.number().optional(),
  experience_level: z.string().optional(),
});

export type TrainerAddFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerAddFormProps {
  onSubmit: (data: Omit<StaffProfile, "id" | "certifications" | "availability">) => Promise<void>;
  onCancel: () => void;
}

const TrainerAddForm = ({ onSubmit, onCancel }: TrainerAddFormProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  
  const { uploadFile, isUploading, uploadProgress } = useTrainerFileUpload();
  
  const form = useForm<TrainerAddFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      bio: "",
      status: "Active",
      hire_date: new Date().toISOString().split('T')[0],
      experience_years: undefined,
      experience_level: "Beginner",
    },
  });

  const handleFormSubmit = async (data: TrainerAddFormValues) => {
    // Combine form data with uploaded profile picture
    const formData = {
      ...data,
      photo_url: photoUrl || "",
      role: 'trainer' as const,
      specialties: selectedSpecializations, // Use the state for specializations
      // Ensure full_name is required and not undefined
      full_name: data.full_name,
    };
    
    await onSubmit(formData);
    form.reset();
    setPhotoUrl(null);
    setSelectedSpecializations([]);
  };

  const handleProfilePhotoUpload = async (file: File) => {
    // Use a temporary ID for the upload, it will be replaced when the trainer is created
    const tempId = "temp-" + Date.now();
    const url = await uploadFile(file, tempId, 'profile_picture');
    if (url) {
      setPhotoUrl(url);
    }
  };

  const handleAddSpecialization = (spec: string) => {
    if (!selectedSpecializations.includes(spec)) {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  const handleRemoveSpecialization = (spec: string) => {
    setSelectedSpecializations(selectedSpecializations.filter(s => s !== spec));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <TrainerAddFormFields 
          form={form}
          profilePictureUrl={photoUrl}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          onProfilePictureUpload={handleProfilePhotoUpload}
        />

        <TrainerAddSpecializationsField
          selectedSpecializations={selectedSpecializations}
          onAddSpecialization={handleAddSpecialization}
          onRemoveSpecialization={handleRemoveSpecialization}
        />

        <TrainerBioField form={form} />

        <FormActions onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default TrainerAddForm;
