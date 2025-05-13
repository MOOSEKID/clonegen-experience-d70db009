
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileIcon, X } from 'lucide-react';
import { useTrainerFileUpload } from '@/hooks/trainers/useTrainerFileUpload';
import FileUpload from '@/components/admin/trainers/common/FileUpload';
import { StaffCertification } from '@/hooks/trainers/types';

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

interface CertificateUploadFormProps {
  trainerId: string;
  onSubmit: (data: Omit<StaffCertification, 'id'>, certificateFile?: File) => Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

const CertificateUploadForm = ({ trainerId, onSubmit, onCancel, isOpen }: CertificateUploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFile, isUploading, uploadProgress } = useTrainerFileUpload();
  
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
    const certData: Omit<StaffCertification, 'id'> = {
      staff_id: trainerId,
      certification_name: data.certification_name,
      issuing_organization: data.issuing_organization,
      issue_date: data.issue_date || undefined,
      expiry_date: data.expiry_date || undefined
    };
    
    await onSubmit(certData, selectedFile || undefined);
    form.reset();
    setSelectedFile(null);
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleClose = () => {
    form.reset();
    setSelectedFile(null);
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Certification</DialogTitle>
        </DialogHeader>
        
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

            <div>
              <FormLabel>Certificate Document</FormLabel>
              <FileUpload
                type="certificate"
                onFileSelected={handleFileSelected}
                isUploading={isUploading}
                progress={uploadProgress}
                buttonText="Upload Certificate"
                acceptedFileTypes="application/pdf,image/png,image/jpeg"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Add Certification</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateUploadForm;
