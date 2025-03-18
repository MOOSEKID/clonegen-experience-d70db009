
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionProps {
  label: string;
  onClick: () => void;
}

interface ErrorMessageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  primaryAction: ActionProps;
  secondaryAction?: ActionProps;
}

export const ErrorMessage = ({
  title,
  description,
  icon = <FileQuestion className="h-24 w-24 text-gym-orange mb-6" />,
  primaryAction,
  secondaryAction
}: ErrorMessageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {icon}
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={primaryAction.onClick}
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button 
            onClick={secondaryAction.onClick}
            variant="outline"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};
