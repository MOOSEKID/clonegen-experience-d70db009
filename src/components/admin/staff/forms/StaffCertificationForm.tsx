
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { StaffCertification } from '@/hooks/trainers/types';

const certificationSchema = z.object({
  staff_id: z.string(),
  certification_name: z.string().min(1, "Certification name is required"),
  issuing_organization: z.string().optional(),
  issue_date: z.string().optional(),
  expiry_date: z.string().optional(),
  verified: z.boolean().default(false),
  certification_file: z.string().optional(),
});

type CertificationFormValues = z.infer<typeof certificationSchema>;

interface StaffCertificationFormProps {
  staffId: string;
  onSubmit: (data: Omit<StaffCertification, 'id'>) => Promise<void>;
}

const StaffCertificationForm: React.FC<StaffCertificationFormProps> = ({ 
  staffId, 
  onSubmit 
}) => {
  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      staff_id: staffId,
      certification_name: '',
      issuing_organization: '',
      issue_date: new Date().toISOString().split('T')[0],
      expiry_date: '',
      verified: false,
      certification_file: '',
    },
  });

  const handleFormSubmit = async (data: CertificationFormValues) => {
    // Ensure staff_id is set explicitly to satisfy the required property constraint
    await onSubmit({
      staff_id: staffId,
      certification_name: data.certification_name,
      issuing_organization: data.issuing_organization,
      issue_date: data.issue_date,
      expiry_date: data.expiry_date,
      verified: data.verified,
      certification_file: data.certification_file,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="certification_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certification Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter certification name" {...field} />
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
              <FormLabel>Issuing Organization</FormLabel>
              <FormControl>
                <Input placeholder="Enter issuing organization" {...field} />
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
                <FormLabel>Expiry Date (if applicable)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="certification_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificate File URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter certificate file URL" {...field} />
              </FormControl>
              <FormDescription>
                Enter a URL to the certificate file or document.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="verified"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Verification Status</FormLabel>
                <FormDescription>
                  Mark this certification as verified if you have confirmed its validity.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="submit">Add Certification</Button>
        </div>
      </form>
    </Form>
  );
};

export default StaffCertificationForm;
