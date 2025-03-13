
import { UploadCloud } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MediaUploadDialogProps {
  mediaType: 'images' | 'videos';
  handleUpload: () => void;
}

const MediaUploadDialog = ({ mediaType, handleUpload }: MediaUploadDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Media</DialogTitle>
      </DialogHeader>
      <div className="border-2 border-dashed rounded-lg p-10 text-center">
        <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-4" />
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop files here, or click to select files
        </p>
        <Label htmlFor="media-upload" className="cursor-pointer">
          <span className="bg-gym-orange text-white px-4 py-2 rounded-md hover:bg-gym-orange/90 transition-colors inline-block">
            Select Files
          </span>
          <input
            id="media-upload"
            type="file"
            className="hidden"
            multiple
            accept={mediaType === 'images' ? 'image/*' : 'video/*'}
          />
        </Label>
      </div>
      <Button 
        className="w-full mt-4"
        onClick={handleUpload}
      >
        Upload Files
      </Button>
    </DialogContent>
  );
};

export default MediaUploadDialog;
