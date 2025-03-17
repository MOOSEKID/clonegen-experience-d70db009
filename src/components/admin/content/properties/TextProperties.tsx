
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ContentElement, ElementProperties } from '@/types/content.types';

interface TextPropertiesProps {
  element: ContentElement;
  onUpdate: (properties: Partial<ElementProperties>) => void;
}

const TextProperties = ({ element, onUpdate }: TextPropertiesProps) => {
  const [text, setText] = useState(element.content);

  useEffect(() => {
    setText(element.content);
  }, [element.content]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    // This would typically update the content rather than properties
    // but we're following the pattern of the existing code
  };

  const handleSizeChange = (size: string) => {
    onUpdate({ size });
  };

  const handleStyleChange = (style: string) => {
    onUpdate({ style });
  };

  const handleAlignChange = (align: string) => {
    onUpdate({ align });
  };

  const handleColorChange = (color: string) => {
    onUpdate({ color });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text-content" className="block mb-2">Text Content</Label>
        <Textarea
          id="text-content"
          value={text}
          onChange={handleTextChange}
          className="w-full min-h-[100px]"
        />
      </div>

      <div>
        <Label className="block mb-2">Text Size</Label>
        <RadioGroup
          defaultValue={element.properties.size}
          onValueChange={handleSizeChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sm" id="size-sm" />
            <Label htmlFor="size-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="md" id="size-md" />
            <Label htmlFor="size-md">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lg" id="size-lg" />
            <Label htmlFor="size-lg">Large</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="xl" id="size-xl" />
            <Label htmlFor="size-xl">Extra Large</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Text Style</Label>
        <RadioGroup
          defaultValue={element.properties.style}
          onValueChange={handleStyleChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="normal" id="style-normal" />
            <Label htmlFor="style-normal">Normal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bold" id="style-bold" />
            <Label htmlFor="style-bold" className="font-bold">Bold</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="italic" id="style-italic" />
            <Label htmlFor="style-italic" className="italic">Italic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="underline" id="style-underline" />
            <Label htmlFor="style-underline" className="underline">Underline</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Text Alignment</Label>
        <RadioGroup
          defaultValue={element.properties.align}
          onValueChange={handleAlignChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="left" id="align-left" />
            <Label htmlFor="align-left">Left</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="center" id="align-center" />
            <Label htmlFor="align-center">Center</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="right" id="align-right" />
            <Label htmlFor="align-right">Right</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="block mb-2">Text Color</Label>
        <RadioGroup
          defaultValue={element.properties.color}
          onValueChange={handleColorChange}
          className="flex flex-wrap gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="color-default" />
            <Label htmlFor="color-default">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="primary" id="color-primary" />
            <Label htmlFor="color-primary" className="text-primary">Primary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="secondary" id="color-secondary" />
            <Label htmlFor="color-secondary" className="text-secondary">Secondary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="muted" id="color-muted" />
            <Label htmlFor="color-muted" className="text-muted-foreground">Muted</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TextProperties;
