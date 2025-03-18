
interface LoginInfoProps {
  loginError: string | null;
}

const LoginInfo = ({ loginError }: LoginInfoProps) => {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-white/70">Log in to access your account</p>
        <div className="mt-4 p-3 bg-gym-orange/10 rounded-md border border-gym-orange/20">
          <p className="text-sm font-medium text-gym-orange">Admin Login: admin@example.com / admin123</p>
          <p className="text-sm text-white/70 mt-1">User Login: user@example.com / user123</p>
        </div>
      </div>
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded text-white text-sm">
          {loginError}
        </div>
      )}
    </>
  );
};

export default LoginInfo;
