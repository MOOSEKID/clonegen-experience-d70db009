
export const useRegisterValidation = () => {
  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const validateForm = (
    fullName: string, 
    email: string, 
    password: string, 
    confirmPassword: string, 
    acceptTerms: boolean
  ): string | null => {
    if (!fullName || !email || !password || !confirmPassword) {
      return 'All fields are required';
    }
    
    if (!acceptTerms) {
      return 'You must accept the terms and conditions';
    }
    
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    
    if (!validatePassword(password)) {
      return 'Password must be at least 8 characters long';
    }
    
    return null;
  };

  return { validateForm };
};

export default useRegisterValidation;
