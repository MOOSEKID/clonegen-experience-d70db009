
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Moon } from 'lucide-react';

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
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Logo Preview</h3>
        <button 
          type="button"
          onClick={onToggleMode}
          className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-800"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
      
      <Card className={`p-6 flex justify-center items-center h-32 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {isDarkMode ? (
          darkLogo ? (
            <img 
              src={darkLogo} 
              alt="Dark Logo Preview" 
              className="max-h-20 max-w-full object-contain"
            />
          ) : (
            <div className="text-sm text-gray-400">No dark logo uploaded</div>
          )
        ) : (
          lightLogo ? (
            <img 
              src={lightLogo} 
              alt="Light Logo Preview" 
              className="max-h-20 max-w-full object-contain"
            />
          ) : (
            <div className="text-sm text-gray-400">No light logo uploaded</div>
          )
        )}
      </Card>
    </div>
  );
};
