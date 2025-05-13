
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { StaffProfile } from "@/hooks/trainers/types";
import TrainerBasicInfoFields from "./form/TrainerBasicInfoFields";
import TrainerSpecializationsField from "./form/TrainerSpecializationsField";
import TrainerBioField from "./form/TrainerBioField";
import FormActions from "./form/FormActions";

const trainerFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  status: z.string(),
  specialties: z.array(z.string()).optional(),
  hire_date: z.string().optional(),
  photo_url: z.string().optional(),
});

export type TrainerFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerEditFormProps {
  trainer: StaffProfile;
  onSubmit: (id: string, data: Partial<StaffProfile>) => Promise<void>;
  onCancel: () => void;
}

const TrainerEditForm = ({ trainer, onSubmit, onCancel }: TrainerEditFormProps) => {
  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      full_name: trainer.full_name,
      email: trainer.email || "",
      phone: trainer.phone || "",
      bio: trainer.bio || "",
      status: trainer.status || "Active",
      specialties: trainer.specialties || [],
      hire_date: trainer.hire_date || new Date().toISOString().split('T')[0],
      photo_url: trainer.photo_url || "",
    },
  });

  const handleFormSubmit = async (data: TrainerFormValues) => {
    await onSubmit(trainer.id, data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <TrainerBasicInfoFields form={form} />
        <TrainerSpecializationsField form={form} />
        <TrainerBioField form={form} />
        <FormActions onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default TrainerEditForm;
