
/**
 * Service for managing authentication-related storage
 */
export const authStorageService = {
  /**
   * Set authentication data in localStorage and cookies
   */
  setAuthData: (
    isLoggedIn: boolean, 
    isAdmin: boolean, 
    userEmail: string, 
    userName: string
  ) => {
    // Store in localStorage
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('isAdmin', String(isAdmin));
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userName', userName);
    
    // Store in cookies with 7-day expiration
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    
    document.cookie = `session_active=${isLoggedIn ? 'true' : 'false'}; path=/; max-age=604800`;
    document.cookie = `user_role=${isAdmin ? 'admin' : 'member'}; path=/; max-age=604800`;
  },
  
  /**
   * Get authentication data from localStorage
   */
  getAuthData: () => {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      isAdmin: localStorage.getItem('isAdmin') === 'true',
      userEmail: localStorage.getItem('userEmail') || '',
      userName: localStorage.getItem('userName') || ''
    };
  },
  
  /**
   * Clear authentication data from localStorage and cookies
   */
  clearAuthData: () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    document.cookie = "session_active=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
  }
};
