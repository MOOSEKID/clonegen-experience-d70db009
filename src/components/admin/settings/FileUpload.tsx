
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Upload, X, FileImage } from 'lucide-react';

interface FileUploadProps {
  bucket: string;
  path: string;
  currentFilePath?: string;
  onUploadComplete: (filePath: string) => void;
  onReset?: () => void;
  accept?: string;
  label?: string;
  maxSizeMB?: number;
}

const FileUpload = ({
  bucket,
  path,
  currentFilePath,
  onUploadComplete,
  onReset,
  accept = 'image/*',
  label = 'Upload File',
  maxSizeMB = 2
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    currentFilePath ? currentFilePath : null
  );
  
  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }
    
    // Validate file type for images
    if (accept === 'image/*' && !file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }
    
    // Validate file extension
    if (accept === 'image/*' && !['jpg', 'jpeg', 'png', 'svg'].includes(fileExtension || '')) {
      toast.error('Only JPG, PNG, and SVG files are allowed');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Create a preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }
      
      // Upload to Supabase Storage
      const filePath = `${path}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { error, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw error;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onUploadComplete(publicUrlData.publicUrl);
      toast.success('File uploaded successfully');
      
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleReset = () => {
    setPreview(null);
    if (onReset) onReset();
  };
  
  const isImageUrl = (url?: string): boolean => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i) !== null || url.startsWith('data:image/');
  };
  
  return (
    <div className="space-y-3">
      {preview && (isImageUrl(preview) ? (
        <div className="relative w-40 h-40 border rounded-md overflow-hidden group">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain bg-gray-50"
          />
          <button
            type="button"
            onClick={handleReset}
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : preview ? (
        <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
          <div className="flex items-center">
            <FileImage size={16} className="text-blue-500 mr-2" />
            <span className="text-sm truncate max-w-[200px]">{preview.split('/').pop()}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : null)}
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          className="cursor-pointer relative"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {label}
            </>
          )}
        </Button>
        <Input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileSelected}
          className="hidden"
          disabled={isUploading}
        />
        {isUploading && <span className="text-xs text-gray-500">Uploading file, please wait...</span>}
      </div>
    </div>
  );
};

export default FileUpload;
