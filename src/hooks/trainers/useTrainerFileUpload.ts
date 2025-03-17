
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export type FileUploadType = 'profile_picture' | 'certificate';

export const useTrainerFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const getBucketName = (type: FileUploadType) => {
    return type === 'profile_picture' ? 'trainer_profiles' : 'trainer_certificates';
  };

  const uploadFile = async (
    file: File,
    trainerId: string,
    type: FileUploadType,
    metadata?: Record<string, string>
  ): Promise<string | null> => {
    if (!file) return null;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Validate file type
      const fileExt = file.name.split('.').pop();
      const allowedExts = type === 'profile_picture' 
        ? ['jpg', 'jpeg', 'png'] 
        : ['jpg', 'jpeg', 'png', 'pdf'];
      
      if (!fileExt || !allowedExts.includes(fileExt.toLowerCase())) {
        throw new Error(`File type not supported. Please upload ${allowedExts.join(', ')}`);
      }
      
      // Validate file size (5MB max)
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB
      if (file.size > fileSizeLimit) {
        throw new Error('File size exceeds 5MB limit');
      }
      
      // Create a unique file name
      const fileName = `${trainerId}_${uuidv4()}.${fileExt}`;
      const bucketName = getBucketName(type);
      const filePath = `${trainerId}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
          duplex: 'half',
        });

      if (error) throw error;

      // Get public URL for profile pictures or path for certificates
      if (type === 'profile_picture') {
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);
        
        return urlData.publicUrl;
      }
      
      // For certificates, return the path
      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload file"
      });
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const deleteFile = async (path: string, type: FileUploadType): Promise<boolean> => {
    if (!path) return false;
    
    try {
      const bucketName = getBucketName(type);
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([path]);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        variant: "destructive",
        title: "Delete Error",
        description: error instanceof Error ? error.message : "Failed to delete file"
      });
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading,
    uploadProgress
  };
};
