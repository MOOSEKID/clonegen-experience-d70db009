
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <img 
        src="/lovable-uploads/20269916-6b0a-4776-b008-14c74c42b7d9.png" 
        alt="Page Not Found" 
        className="w-32 h-auto mb-8"
      />
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate('/')}
          className="bg-[#FF7F50] hover:bg-[#FF7F50]/90 text-white px-8 py-3 text-lg"
        >
          Go to Homepage
        </Button>
        <Button 
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-gray-300 text-gray-700 px-8 py-3 text-lg"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
