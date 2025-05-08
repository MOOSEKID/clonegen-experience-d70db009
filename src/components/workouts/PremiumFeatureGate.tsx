
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface PremiumFeatureGateProps {
  hasPremium: boolean;
  featureName: string;
  fallbackMessage?: string;
  children: React.ReactNode;
}

const PremiumFeatureGate = ({ 
  hasPremium, 
  featureName, 
  fallbackMessage = "Upgrade to access premium features", 
  children 
}: PremiumFeatureGateProps) => {
  const navigate = useNavigate();
  
  if (hasPremium) {
    return <>{children}</>;
  }
  
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        onClick={() => navigate('/membership')}
        className="flex items-center gap-2"
      >
        <Lock className="h-4 w-4" />
        <span>{fallbackMessage}</span>
      </Button>
    </div>
  );
};

export default PremiumFeatureGate;
