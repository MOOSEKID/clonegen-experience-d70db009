
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PlaceholderSectionProps {
  title: string;
  icon?: React.ReactNode;
  description: string;
  className?: string;
  onClick?: () => void;
  ctaText?: string;
  features?: string[];
}

const PlaceholderSection = ({ 
  title, 
  icon, 
  description, 
  className,
  onClick,
  ctaText,
  features
}: PlaceholderSectionProps) => {
  return (
    <div 
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gym-orange/50 transition-all",
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="bg-gym-orange/10 p-4 rounded-full mb-4">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mb-6">{description}</p>
      
      {features && features.length > 0 && (
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-left mb-6 w-full max-w-md">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-gym-orange rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      )}
      
      {ctaText && (
        <Button 
          variant="default" 
          className="bg-gym-orange hover:bg-gym-orange/90 mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
};

export default PlaceholderSection;
