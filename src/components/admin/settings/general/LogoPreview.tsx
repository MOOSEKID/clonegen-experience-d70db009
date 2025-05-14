
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoPreviewProps {
  lightLogo?: string;
  darkLogo?: string;
  isDarkMode: boolean;
  onToggleMode: () => void;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ 
  lightLogo, 
  darkLogo, 
  isDarkMode,
  onToggleMode
}) => {
  const currentLogo = isDarkMode ? darkLogo : lightLogo;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Logo Preview</h3>
        <Button 
          type="button"
          onClick={onToggleMode}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1 text-xs"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              Switch to Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              Switch to Dark Mode
            </>
          )}
        </Button>
      </div>
      
      <Card className={`p-6 flex flex-col justify-center items-center h-40 transition-colors durationMinutes-200 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {currentLogo ? (
          <>
            <img 
              src={currentLogo} 
              alt={`${isDarkMode ? 'Dark' : 'Light'} Logo Preview`} 
              className="max-h-20 max-w-full object-contain mb-2"
            />
            <p className="text-xs text-center mt-2 opacity-60">
              {isDarkMode ? 'Dark mode logo preview' : 'Light mode logo preview'}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="text-sm text-gray-400">
              No {isDarkMode ? 'dark' : 'light'} logo uploaded
            </div>
            <p className="text-xs mt-2 opacity-60">
              Upload a logo to see the preview
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
