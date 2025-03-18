
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="bg-red-50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-500 text-4xl">!</span>
        </div>
        <h1 className="text-4xl font-bold text-gym-dark mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            isLink 
            href="/" 
            size="lg"
            className="bg-gym-orange hover:bg-gym-orange/90"
          >
            Go to Homepage
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
