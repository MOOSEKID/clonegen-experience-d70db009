
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export enum SectionType {
  EDITABLE = "editable",
  DYNAMIC = "dynamic", 
  OPTIONAL = "optional"
}

interface ContentSectionWrapperProps {
  children: React.ReactNode;
  type: SectionType;
  title: string;
  description?: string;
  isSelected?: boolean;
  canReorder?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const ContentSectionWrapper = ({
  children,
  type,
  title,
  description,
  isSelected = false,
  canReorder = true,
  onSelect,
  className
}: ContentSectionWrapperProps) => {
  const isDynamic = type === SectionType.DYNAMIC;
  const isOptional = type === SectionType.OPTIONAL;
  
  return (
    <div
      className={cn(
        "relative border rounded-lg mb-4 transition-all group",
        isDynamic ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200",
        isOptional ? "border-dashed" : "border-solid",
        isSelected ? "ring-2 ring-gym-orange" : "",
        className
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b rounded-t-lg">
        <div className="flex items-center">
          {isDynamic && (
            <div className="mr-2 bg-blue-100 p-1 rounded">
              <LockIcon size={14} className="text-blue-500" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium">{title}</h3>
            {description && <p className="text-xs text-gray-500">{description}</p>}
          </div>
        </div>
        
        {isDynamic && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Dynamic Data
          </span>
        )}
        
        {isOptional && (
          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
            Optional
          </span>
        )}
      </div>
      
      <div className="p-4">
        {children}
      </div>
      
      {!isDynamic && isSelected && (
        <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          {/* We'll add control buttons here later */}
        </div>
      )}
    </div>
  );
};

export const DynamicSectionPlaceholder = ({ title, message }: { title: string, message: string }) => (
  <div className="bg-blue-50 border border-dashed border-blue-200 rounded-lg p-6 text-center">
    <div className="flex justify-center mb-2">
      <LockIcon className="h-5 w-5 text-blue-400" />
    </div>
    <h4 className="text-sm font-medium text-blue-700">{title}</h4>
    <p className="text-xs text-blue-600 mt-1">{message}</p>
  </div>
);
