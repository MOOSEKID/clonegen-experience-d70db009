
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
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
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <Form.Field
          control={form.control}
          name="certification_name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Certification Name*</Form.Label>
              <Form.Control>
                <Input placeholder="Enter certification name" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="issuing_organization"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Issuing Organization</Form.Label>
              <Form.Control>
                <Input placeholder="Enter issuing organization" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Form.Field
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Issue Date</Form.Label>
                <Form.Control>
                  <Input type="date" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="expiry_date"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Expiry Date (if applicable)</Form.Label>
                <Form.Control>
                  <Input type="date" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>

        <Form.Field
          control={form.control}
          name="certification_file"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Certificate File URL</Form.Label>
              <Form.Control>
                <Input placeholder="Enter certificate file URL" {...field} />
              </Form.Control>
              <Form.Description>
                Enter a URL to the certificate file or document.
              </Form.Description>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="verified"
          render={({ field }) => (
            <Form.Item className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
              <Form.Control>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </Form.Control>
              <div className="space-y-1 leading-none">
                <Form.Label>Verification Status</Form.Label>
                <Form.Description>
                  Mark this certification as verified if you have confirmed its validity.
                </Form.Description>
              </div>
            </Form.Item>
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
