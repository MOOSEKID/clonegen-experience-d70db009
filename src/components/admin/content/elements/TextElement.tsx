
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Pencil, Link } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LinkDialog from '../dialogs/LinkDialog';

interface TextElementProps {
  element: any;
  isEditing: boolean;
  onUpdate: (element: any) => void;
}

const TextElement = ({ element, isEditing, onUpdate }: TextElementProps) => {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [contentValue, setContentValue] = useState(element.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContentValue(element.content);
  }, [element.content]);

  useEffect(() => {
    if (isEditingContent && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditingContent]);

  const handleSaveContent = () => {
    onUpdate({
      ...element,
      content: contentValue
    });
    setIsEditingContent(false);
  };

  const handleApplyLink = (url: string, text: string) => {
    onUpdate({
      ...element,
      content: text,
      link: url
    });
  };

  const { properties = {} } = element;
  const { align = 'left', size = 'medium', style = 'normal', color = '#000000', padding = 'medium' } = properties;

  // Determine text size class
  const sizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
    '2xlarge': 'text-2xl',
    '3xlarge': 'text-3xl',
    '4xlarge': 'text-4xl',
  }[size] || 'text-base';

  // Determine text style class
  const styleClass = {
    normal: 'font-normal',
    bold: 'font-bold',
    italic: 'italic',
    'bold-italic': 'font-bold italic',
  }[style] || 'font-normal';

  // Determine padding class
  const paddingClass = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  }[padding] || 'p-4';

  // Common styles based on properties
  const commonStyles = {
    textAlign: align,
    color,
  };

  if (isEditing && isEditingContent) {
    return (
      <div>
        <textarea
          ref={textareaRef}
          value={contentValue}
          onChange={(e) => setContentValue(e.target.value)}
          className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
        />
        <div className="mt-2 flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditingContent(false)}
          >
            Cancel
          </Button>
          <Button 
            size="sm" 
            onClick={handleSaveContent}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <p 
        className={`${sizeClass} ${styleClass} ${paddingClass}`} 
        style={commonStyles}
        onClick={() => isEditing && setIsEditingContent(true)}
      >
        {element.content}
      </p>
      {isEditing && !isEditingContent && (
        <div className="mt-2 flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditingContent(true)}
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit Text
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Link className="h-3 w-3 mr-1" />
                Add Link
              </Button>
            </DialogTrigger>
            <LinkDialog element={element} onApply={handleApplyLink} />
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default TextElement;
