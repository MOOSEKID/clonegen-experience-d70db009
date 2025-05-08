
import { PlusCircle, Monitor, Smartphone, Tablet, Eye, EyeOff } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const AddElementButton = ({ onAddElement }) => {
  return (
    <div className="mt-6 flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add Element</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Element Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAddElement('text')}>
            Text Block
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddElement('image')}>
            Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddElement('video')}>
            Video
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddElement('button')}>
            Button
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface ContentEditorToolsProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onAddElement: (type: string) => void;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  onChangeViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

const ContentEditorTools = ({ 
  isPreviewMode, 
  onTogglePreview, 
  onAddElement, 
  viewMode, 
  onChangeViewMode 
}: ContentEditorToolsProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-wrap gap-2">
      <div className="flex items-center gap-2 flex-1">
        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          onClick={onTogglePreview}
          className="flex items-center gap-1"
        >
          {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="hidden sm:inline">{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
        </Button>

        {!isPreviewMode && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Add Element</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Element Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onAddElement('text')}>
                Text Block
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddElement('image')}>
                Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddElement('video')}>
                Video
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddElement('button')}>
                Button
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Responsive View Controls */}
      <div className="flex border rounded-md overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 ${viewMode === 'desktop' ? 'bg-gray-100' : ''}`}
          onClick={() => onChangeViewMode('desktop')}
        >
          <Monitor className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2">Desktop</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 ${viewMode === 'tablet' ? 'bg-gray-100' : ''}`}
          onClick={() => onChangeViewMode('tablet')}
        >
          <Tablet className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2">Tablet</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`p-2 ${viewMode === 'mobile' ? 'bg-gray-100' : ''}`}
          onClick={() => onChangeViewMode('mobile')}
        >
          <Smartphone className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:ml-2">Mobile</span>
        </Button>
      </div>
    </div>
  );
};

export default ContentEditorTools;
