
import useSupabaseConnectionCheck from '@/hooks/auth/useSupabaseConnectionCheck';
import useAuthLoginLogic from '@/hooks/auth/useAuthLoginLogic';
import LoginActions from '@/components/auth/LoginActions';

const Login = () => {
  // Check Supabase connection and set fallback mode if needed
  const { fallbackMode } = useSupabaseConnectionCheck();
  
  // Get authentication logic
  const {
    loginError,
    isLoading,
    handleLoginSubmit,
    handleAdminLogin,
    handleUserLogin,
    handleResetAuth
  } = useAuthLoginLogic({ fallbackMode });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
      <LoginActions 
        loginError={loginError}
        isLoading={isLoading}
        fallbackMode={fallbackMode}
        onLogin={handleLoginSubmit}
        onAdminLogin={handleAdminLogin}
        onUserLogin={handleUserLogin}
        onResetAuth={handleResetAuth}
      />
    </div>
  );
};

export default Login;
