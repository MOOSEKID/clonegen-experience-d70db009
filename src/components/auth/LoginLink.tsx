
import { Link } from 'react-router-dom';

const LoginLink = () => {
  return (
    <p className="text-sm text-center">
      Already have an account?{' '}
      <Link 
        to="/login" 
        className="text-gym-orange hover:underline font-medium"
      >
        Sign in
      </Link>
    </p>
  );
};

export default LoginLink;
