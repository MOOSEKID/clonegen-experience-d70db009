
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useTrainerFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = async (file: File, trainerId: string, fileType: string): Promise<string | null> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${trainerId}_${fileType}_${Date.now()}.${fileExt}`;
      const filePath = `trainers/${trainerId}/${fileName}`;
      
      // Check if storage exists, create bucket if needed
      const { data: buckets } = await supabase.storage.listBuckets();
      const trainersBucket = buckets?.find(bucket => bucket.name === 'trainers');
      
      if (!trainersBucket) {
        await supabase.storage.createBucket('trainers', {
          public: true,
          fileSizeLimit: 2097152, // 2MB
        });
      }
      
      // Upload the file
      const { data, error } = await supabase.storage
        .from('trainers')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(Math.round(percent));
          },
        });
        
      if (error) {
        throw error;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('trainers')
        .getPublicUrl(filePath);
        
      // Success message
      toast({
        title: "Upload successful",
        description: "File has been uploaded.",
      });
      
      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Could not upload file. Please try again.",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    isUploading,
    uploadProgress,
  };
};
