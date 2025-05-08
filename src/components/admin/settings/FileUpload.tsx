
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';

interface FileUploadProps {
  bucket: string;
  path: string;
  currentFilePath?: string;
  onUploadComplete: (filePath: string) => void;
  onReset?: () => void;
  accept?: string;
  label?: string;
}

const FileUpload = ({
  bucket,
  path,
  currentFilePath,
  onUploadComplete,
  onReset,
  accept = 'image/*',
  label = 'Upload File'
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    currentFilePath ? currentFilePath : null
  );
  
  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsUploading(true);
    
    try {
      // Create a preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }
      
      // Upload to Supabase Storage
      const filePath = `${path}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get the public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onUploadComplete(data.publicUrl);
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
  
  return (
    <div className="space-y-3">
      {preview && preview.startsWith('data:image') || 
       (preview && (preview.includes('.png') || preview.includes('.jpg') || preview.includes('.jpeg') || preview.includes('.gif') || preview.includes('.webp'))) ? (
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
          <span className="text-sm truncate max-w-[200px]">{preview.split('/').pop()}</span>
          <button
            type="button"
            onClick={handleReset}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      ) : null}
      
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
      </div>
    </div>
  );
};

export default FileUpload;
