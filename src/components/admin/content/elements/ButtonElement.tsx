
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ButtonElementProps {
  element: any;
  isEditing: boolean;
  onUpdate: (element: any) => void;
}

const ButtonElement = ({ element, isEditing, onUpdate }: ButtonElementProps) => {
  const { properties = {} } = element;
  const { align = 'left', padding = 'medium' } = properties;
  
  // Determine padding class
  const paddingClass = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  }[padding] || 'p-4';

  return (
    <div className={paddingClass} style={{ textAlign: align }}>
      <Button 
        className="bg-gym-orange hover:bg-gym-orange/90"
        onClick={() => element.link && window.open(element.link, '_blank')}
      >
        {element.content || 'Button Text'}
      </Button>
      {isEditing && (
        <div className="mt-2 flex justify-end space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit Button
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Button</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="button-text">Button Text</Label>
                  <Input 
                    id="button-text" 
                    placeholder="Click Here"
                    defaultValue={element.content}
                    onChange={(e) => onUpdate({ ...element, content: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="button-link">Button Link</Label>
                  <Input 
                    id="button-link" 
                    placeholder="https://example.com"
                    defaultValue={element.link}
                    onChange={(e) => onUpdate({ ...element, link: e.target.value })}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ButtonElement;
