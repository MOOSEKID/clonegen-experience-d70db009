
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2Icon, PlusIcon, XIcon } from 'lucide-react';
import FileUpload from '@/components/admin/trainers/common/FileUpload';
import { useTrainerFileUpload } from '@/hooks/trainers/useTrainerFileUpload';

interface CertificateUploadFormProps {
  trainerId: string;
  onCertificateAdded: (certUrl: string) => void;
  onCancel: () => void;
}

const CertificateUploadForm: React.FC<CertificateUploadFormProps> = ({
  trainerId,
  onCertificateAdded,
  onCancel
}) => {
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certUrl, setCertUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { uploadFile, isUploading, uploadProgress } = useTrainerFileUpload();

  const handleFileUpload = async (file: File) => {
    setCertFile(file);
    
    try {
      const fileUrl = await uploadFile(file, trainerId, 'certification');
      if (fileUrl) {
        setCertUrl(fileUrl);
        toast({
          title: "File uploaded",
          description: "Certificate file was successfully uploaded.",
        });
      }
    } catch (error) {
      console.error('Error uploading certification:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading the certification file.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certName || !certIssuer || !certDate) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all certificate details.",
      });
      return;
    }
    
    if (!certUrl) {
      toast({
        variant: "destructive",
        title: "Missing file",
        description: "Please upload a certificate file.",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Here we would typically save the certificate data to the database
      // For demonstration, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the callback with the new certificate URL
      onCertificateAdded(certUrl);
      
      toast({
        title: "Certificate added",
        description: "The certification has been added successfully.",
      });
      
      // Reset the form
      setCertName('');
      setCertIssuer('');
      setCertDate('');
      setCertFile(null);
      setCertUrl(null);
      
      // Close the form
      onCancel();
    } catch (error) {
      console.error('Error adding certification:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding the certification.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Add Certification</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cert-name" className="block text-sm font-medium">
              Certification Name
            </label>
            <input
              id="cert-name"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              disabled={isSubmitting}
              placeholder="e.g., Personal Trainer Certification"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cert-issuer" className="block text-sm font-medium">
              Issuing Organization
            </label>
            <input
              id="cert-issuer"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={certIssuer}
              onChange={(e) => setCertIssuer(e.target.value)}
              disabled={isSubmitting}
              placeholder="e.g., NASM, ACE, ISSA"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cert-date" className="block text-sm font-medium">
              Date Issued
            </label>
            <input
              id="cert-date"
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={certDate}
              onChange={(e) => setCertDate(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Certificate File
            </label>
            <FileUpload
              type="certification"
              onFileSelected={handleFileUpload}
              isUploading={isUploading}
              progress={uploadProgress}
              buttonText="Upload Certificate"
              acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
              previewUrl={certUrl || undefined}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || isUploading || !certUrl}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Certificate
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CertificateUploadForm;
