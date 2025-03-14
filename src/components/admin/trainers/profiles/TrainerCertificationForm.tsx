
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TrainerCertification } from "@/hooks/trainers/useTrainerProfiles";

const certificationFormSchema = z.object({
  certification_name: z.string().min(2, { message: "Certification name is required." }),
  issuing_organization: z.string().min(2, { message: "Issuing organization is required." }),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional(),
}).refine(data => !data.issue_date || !data.expiry_date || data.expiry_date >= data.issue_date, {
  message: "Expiry date must be after issue date.",
  path: ["expiry_date"],
});

type CertificationFormValues = z.infer<typeof certificationFormSchema>;

interface TrainerCertificationFormProps {
  trainerId: string;
  onSubmit: (data: Omit<TrainerCertification, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const TrainerCertificationForm = ({ trainerId, onSubmit, onCancel }: TrainerCertificationFormProps) => {
  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues: {
      certification_name: "",
      issuing_organization: "",
      issue_date: "",
      expiry_date: "",
    },
  });

  const handleSubmit = async (data: CertificationFormValues) => {
    const certData: Omit<TrainerCertification, 'id'> = {
      trainer_id: trainerId,
      certification_name: data.certification_name,
      issuing_organization: data.issuing_organization,
      issue_date: data.issue_date || undefined,
      expiry_date: data.expiry_date || undefined
    };
    await onSubmit(certData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="certification_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification Name*</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Personal Trainer Certification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issuing_organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuing Organization*</FormLabel>
              <FormControl>
                <Input placeholder="e.g., American Council on Exercise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiry_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Certification</Button>
        </div>
      </form>
    </Form>
  );
};

export default TrainerCertificationForm;
