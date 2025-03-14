
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useTrainerFileUpload } from "@/hooks/trainers/useTrainerFileUpload";
import { TrainerProfile } from "@/hooks/trainers/useTrainerProfiles";
import TrainerAddFormFields from "./form/TrainerAddFormFields";
import TrainerAddSpecializationsField from "./form/TrainerAddSpecializationsField";
import TrainerBioField from "./form/TrainerBioField";
import FormActions from "./form/FormActions";

const trainerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  status: z.string(),
  specialization: z.array(z.string()).optional(),
  hire_date: z.string().optional(),
  experience_years: z.number().optional(),
  experience_level: z.string().optional(),
});

export type TrainerAddFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerAddFormProps {
  onSubmit: (data: Omit<TrainerProfile, "id" | "certifications" | "availability">) => Promise<void>;
  onCancel: () => void;
}

const TrainerAddForm = ({ onSubmit, onCancel }: TrainerAddFormProps) => {
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  
  const { uploadFile, isUploading, uploadProgress } = useTrainerFileUpload();
  
  const form = useForm<TrainerAddFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      status: "Active",
      specialization: [],
      hire_date: new Date().toISOString().split('T')[0],
      experience_years: undefined,
      experience_level: "Beginner",
    },
  });

  const handleFormSubmit = async (data: TrainerAddFormValues) => {
    // Combine form data with uploaded profile picture
    const formData = {
      ...data,
      specialization: selectedSpecializations,
      profile_picture: profilePictureUrl,
    };
    
    await onSubmit(formData as Omit<TrainerProfile, "id" | "certifications" | "availability">);
    form.reset();
    setSelectedSpecializations([]);
    setProfilePictureUrl(null);
  };

  const addSpecialization = (spec: string) => {
    if (spec.trim() === "") return;
    
    if (!selectedSpecializations.includes(spec)) {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  const removeSpecialization = (spec: string) => {
    setSelectedSpecializations(selectedSpecializations.filter(s => s !== spec));
  };

  const handleProfilePictureUpload = async (file: File) => {
    // Use a temporary ID for the upload, it will be replaced when the trainer is created
    const tempId = "temp-" + Date.now();
    const url = await uploadFile(file, tempId, 'profile_picture');
    if (url) {
      setProfilePictureUrl(url);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <TrainerAddFormFields 
          form={form}
          profilePictureUrl={profilePictureUrl}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          onProfilePictureUpload={handleProfilePictureUpload}
        />

        <TrainerAddSpecializationsField
          selectedSpecializations={selectedSpecializations}
          onAddSpecialization={addSpecialization}
          onRemoveSpecialization={removeSpecialization}
        />

        <TrainerBioField form={form} />

        <FormActions onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default TrainerAddForm;
