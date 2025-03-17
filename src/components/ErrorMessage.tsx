
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActionButton {
  label: string;
  onClick: () => void;
}

interface ErrorMessageProps {
  title: string;
  description: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {primaryAction && (
            <Button 
              onClick={primaryAction.onClick}
              className="bg-gym-orange hover:bg-gym-orange/90"
            >
              {primaryAction.label}
            </Button>
          )}
          
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
    </div>
  );
};
