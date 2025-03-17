
import { Trash2, Copy, ChevronUp, ChevronDown } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ElementActionsProps {
  index: number;
  onDelete: (index: number) => void;
  onDuplicate: (index: number) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const ElementActions = ({ 
  index, 
  onDelete, 
  onDuplicate, 
  onMoveUp, 
  onMoveDown 
}: ElementActionsProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(index);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDuplicate(index);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveUp();
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveDown();
  };

  return (
    <TooltipProvider>
      <div className="flex space-x-2 text-gray-500">
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={handleMoveUp}
              className="p-1 hover:bg-gray-100 rounded-md"
              aria-label="Move Up"
            >
              <ChevronUp size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Move Up</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={handleMoveDown}
              className="p-1 hover:bg-gray-100 rounded-md"
              aria-label="Move Down"
            >
              <ChevronDown size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Move Down</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={handleDuplicate}
              className="p-1 hover:bg-gray-100 rounded-md"
              aria-label="Duplicate"
            >
              <Copy size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Duplicate</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={handleDelete}
              className="p-1 hover:bg-gray-100 rounded-md text-red-500"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ElementActions;
