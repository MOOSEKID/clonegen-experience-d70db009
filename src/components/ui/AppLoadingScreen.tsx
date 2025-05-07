
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface AppLoadingScreenProps {
  message?: string;
}

export const AppLoadingScreen = ({ 
  message = "Loading application..."
}: AppLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress to give user feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        // Move progressively slower as we approach 90%
        if (oldProgress >= 90) {
          clearInterval(timer);
          return 90;
        }
        const newProgress = oldProgress + (90 - oldProgress) * 0.1;
        return Math.min(newProgress, 90);
      });
    }, 300);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gym-dark">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" 
            alt="Uptown Gym Logo" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <LoadingSpinner 
            size="lg" 
            color="gym-orange" 
            className="mx-auto mb-4" 
          />
          <h2 className="text-xl font-bold text-white mb-2">
            {message}
          </h2>
          <p className="text-white/70 text-sm">
            Please wait while we prepare everything for you
          </p>
        </div>
        
        <div className="w-full mb-2">
          <Progress 
            value={progress} 
            className="h-2 bg-gray-700" 
          />
        </div>
        <p className="text-white/50 text-xs text-center">
          {Math.round(progress)}% complete
        </p>
      </div>
    </div>
  );
};

export default AppLoadingScreen;
