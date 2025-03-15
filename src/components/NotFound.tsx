
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from './ErrorMessage';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorMessage
      title="Page Not Found"
      description="The page you are looking for doesn't exist or has been moved."
      primaryAction={{
        label: "Go to Homepage",
        onClick: () => navigate('/')
      }}
      secondaryAction={{
        label: "Go Back",
        onClick: () => navigate(-1)
      }}
    />
  );
};

export default NotFound;
