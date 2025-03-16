
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { UploadIcon, XIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  type: 'profile_picture' | 'certification' | 'document';
  onFileSelected: (file: File) => Promise<void>;
  isUploading: boolean;
  progress: number;
  buttonText?: string;
  previewUrl?: string;
  acceptedFileTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  type,
  onFileSelected,
  isUploading,
  progress,
  buttonText = 'Upload File',
  previewUrl,
  acceptedFileTypes
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
      
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      await onFileSelected(file);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAcceptAttribute = () => {
    if (acceptedFileTypes) return acceptedFileTypes;
    if (type === 'profile_picture') return 'image/*';
    if (type === 'certification') return '.pdf,.jpg,.jpeg,.png';
    return undefined;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={getAcceptAttribute()}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={triggerFileInput} 
          disabled={isUploading}
          className="mr-2"
        >
          <UploadIcon className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
        {selectedFile && (
          <span className="text-sm text-muted-foreground">
            {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
          </span>
        )}
        {(selectedFile || previewImage) && !isUploading && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={clearFile}
            className="ml-auto h-8 w-8"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isUploading && (
        <div className="space-y-1">
          <Progress value={progress} max={100} />
          <p className="text-xs text-center text-muted-foreground">{progress}% uploaded</p>
        </div>
      )}
      
      {previewImage && type === 'profile_picture' && (
        <div className="mt-2">
          <div className="relative w-20 h-20 overflow-hidden rounded-md">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="object-cover w-full h-full" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
