
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gym-orange';
  className?: string;
  text?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  className,
  text
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };
  
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    'gym-orange': 'text-gym-orange',
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 
        className={cn(
          "animate-spin",
          sizeClasses[size],
          colorClasses[color],
          className
        )} 
      />
      {text && (
        <p className={cn("mt-2 text-sm", colorClasses[color])}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
