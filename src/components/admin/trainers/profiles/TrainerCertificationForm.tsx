
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const certificationFormSchema = z.object({
  trainer_id: z.string(),
  certification_name: z.string().min(2, "Certification name is required"),
  issuing_organization: z.string().min(2, "Organization name is required"),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional()
});

interface TrainerCertificationFormProps {
  trainerId: string;
  onSubmit: (data: z.infer<typeof certificationFormSchema>) => Promise<void>;
  onCancel: () => void;
}

const TrainerCertificationForm = ({ trainerId, onSubmit, onCancel }: TrainerCertificationFormProps) => {
  const form = useForm<z.infer<typeof certificationFormSchema>>({
    resolver: zodResolver(certificationFormSchema),
    defaultValues: {
      trainer_id: trainerId,
      certification_name: "",
      issuing_organization: "",
      issue_date: "",
      expiry_date: ""
    }
  });

  const handleSubmit = async (data: z.infer<typeof certificationFormSchema>) => {
    await onSubmit(data);
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
                <Input placeholder="e.g. Certified Personal Trainer" {...field} />
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
                <Input placeholder="e.g. National Academy of Sports Medicine" {...field} />
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

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">Add Certification</Button>
        </div>
      </form>
    </Form>
  );
};

export default TrainerCertificationForm;
