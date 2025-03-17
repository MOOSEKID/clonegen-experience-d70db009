
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
        <h1 className="text-9xl font-bold text-gym-orange mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gym-dark mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Button isLink href="/" size="lg" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
