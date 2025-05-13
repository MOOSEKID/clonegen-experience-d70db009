
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
  backPath?: string;
  features?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  comingSoon = false,
  backPath = '/admin/staff',
  features,
  ctaText,
  onCtaClick
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(backPath)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>

      {comingSoon ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-10 flex flex-col items-center justify-center">
            <div className="bg-amber-50 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</h2>
            <p className="text-gray-500 text-center max-w-md mb-4">
              This feature is currently under development and will be available soon.
            </p>
          </CardContent>
        </Card>
      ) : (
        <PlaceholderSection 
          title={title}
          description={description}
          features={features}
          ctaText={ctaText}
          onClick={onCtaClick}
        />
      )}
    </div>
  );
};

export default PlaceholderPage;
