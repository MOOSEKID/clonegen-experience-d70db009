
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <FileQuestion className="h-24 w-24 text-gym-orange mb-6" />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate('/')}
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          Go to Homepage
        </Button>
        <Button 
          onClick={() => navigate(-1)}
          variant="outline"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
