
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useTrainerFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = async (
    file: File, 
    trainerId: string, 
    fileType: 'profile_picture' | 'certificate'
  ): Promise<string | null> => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const bucketId = fileType === 'profile_picture' ? 'trainer_profiles' : 'trainer_certificates';
      const fileExt = file.name.split('.').pop();
      const fileName = `${trainerId}-${Date.now()}.${fileExt}`;
      const filePath = `${trainerId}/${fileName}`;
      
      // Upload the file
      const { error: uploadError, data } = await supabase.storage
        .from(bucketId)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            const calculatedProgress = Math.round((progress.loaded / progress.total) * 100);
            setUploadProgress(calculatedProgress);
          }
        });
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketId)
        .getPublicUrl(filePath);
        
      setUploadProgress(100);
      toast({
        title: "File uploaded",
        description: "Your file was successfully uploaded."
      });
      
      return publicUrl;
    } catch (err) {
      console.error('Error uploading file:', err);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again."
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    uploadProgress
  };
};
