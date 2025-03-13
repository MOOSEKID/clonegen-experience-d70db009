
import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LinkDialogProps {
  element: any;
  onApply: (url: string, text: string) => void;
}

const LinkDialog = ({ element, onApply }: LinkDialogProps) => {
  const [url, setUrl] = useState(element.link || '');
  const [text, setText] = useState(element.content || '');
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Link</DialogTitle>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <div>
          <Label htmlFor="link-text">Link Text</Label>
          <Input 
            id="link-text" 
            placeholder="Click here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="link-url">URL</Label>
          <Input 
            id="link-url" 
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => onApply(url, text)}
          className="w-full"
        >
          Apply Link
        </Button>
      </div>
    </DialogContent>
  );
};

export default LinkDialog;
