
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SelectImageDialogProps {
  onSelect: (url: string) => void;
}

const SelectImageDialog = ({ onSelect }: SelectImageDialogProps) => {
  const sampleImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop'
  ];
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Select Image</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        {sampleImages.map((image, index) => (
          <div 
            key={index}
            className="border rounded-md overflow-hidden cursor-pointer hover:border-gym-orange transition-colors"
            onClick={() => onSelect(image)}
          >
            <img src={image} alt={`Sample ${index + 1}`} className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>
    </DialogContent>
  );
};

export default SelectImageDialog;
