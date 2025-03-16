
/**
 * Manages cookie and local storage for authentication
 */
export const authStorageService = {
  /**
   * Stores authentication data in cookies and local storage
   */
  setAuthData: (isAuthenticated: boolean, isAdmin: boolean, email: string, fullName: string): void => {
    // Set local storage values
    if (isAuthenticated) {
      localStorage.setItem('isLoggedIn', 'true');
      
      if (isAdmin) {
        localStorage.setItem('isAdmin', 'true');
      } else {
        localStorage.removeItem('isAdmin');
      }
      
      localStorage.setItem('userEmail', email || '');
      localStorage.setItem('userName', fullName || email || '');
      
      // Set cookies
      document.cookie = "session_active=true; path=/; max-age=2592000"; // 30 days
      
      if (isAdmin) {
        document.cookie = "user_role=admin; path=/; max-age=2592000"; // 30 days
      } else {
        document.cookie = "user_role=member; path=/; max-age=2592000"; // 30 days
      }
    } else {
      // Clear local storage and cookies
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      
      document.cookie = "session_active=; path=/; max-age=0";
      document.cookie = "user_role=; path=/; max-age=0";
    }
  }
};
