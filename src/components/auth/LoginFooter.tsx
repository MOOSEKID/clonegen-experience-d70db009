
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <>
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link 
          to="/signup" 
          className="text-gym-orange hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
      <div className="text-center text-xs text-gray-500">
        By signing in, you agree to our{' '}
        <Link to="/terms" className="underline">Terms of Service</Link>{' '}
        and{' '}
        <Link to="/privacy" className="underline">Privacy Policy</Link>
      </div>
    </>
  );
};

export default LoginFooter;
