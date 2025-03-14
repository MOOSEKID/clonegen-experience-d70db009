
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, FileText, Image } from 'lucide-react';
import { FileUploadType } from '@/hooks/trainers/useTrainerFileUpload';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  onCancel?: () => void;
  type: FileUploadType;
  isUploading?: boolean;
  progress?: number;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  buttonText?: string;
  showPreview?: boolean;
  previewUrl?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  onCancel,
  type,
  isUploading = false,
  progress = 0,
  acceptedFileTypes = type === 'profile_picture' ? 'image/*' : 'image/*,application/pdf',
  maxSizeMB = 5,
  buttonText = 'Upload File',
  showPreview = true,
  previewUrl,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size exceeds ${maxSizeMB}MB limit`);
        return;
      }
      
      setSelectedFile(file);
      onFileSelected(file);
      
      // Generate preview for images
      if (file.type.startsWith('image/') && showPreview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        setPreview('pdf');
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelClick = () => {
    setSelectedFile(null);
    setPreview(null);
    if (onCancel) onCancel();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
      />
      
      {!selectedFile && !preview ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleButtonClick}
          className="w-full flex justify-center items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {buttonText}
        </Button>
      ) : (
        <div className="border border-input rounded-md p-2">
          {showPreview && preview && (
            <div className="mb-2">
              {preview === 'pdf' ? (
                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                  <FileText className="h-6 w-6 text-blue-500" />
                  <span className="text-sm truncate">{selectedFile?.name}</span>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-md" 
                  />
                </div>
              )}
            </div>
          )}
          
          {isUploading ? (
            <Progress value={progress} className="h-2 my-2" />
          ) : (
            <div className="flex justify-between gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleButtonClick}
                className="flex-1"
              >
                Change
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleCancelClick}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
