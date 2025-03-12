
import { cn } from '@/lib/utils';

interface PlaceholderSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  className?: string;
  onClick?: () => void;
}

const PlaceholderSection = ({ 
  title, 
  icon, 
  description, 
  className,
  onClick 
}: PlaceholderSectionProps) => {
  return (
    <div 
      className={cn(
        "bg-white border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-gym-orange/50 transition-all",
        className
      )}
      onClick={onClick}
    >
      <div className="bg-gym-orange/10 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md">{description}</p>
    </div>
  );
};

export default PlaceholderSection;
