
/**
 * Manages cookie and local storage for authentication
 */
export const authStorageService = {
  /**
   * Stores authentication data in cookies and local storage
   */
  setAuthData: (isAuthenticated: boolean, isAdmin: boolean, email: string, fullName: string): void => {
    // Log operation
    console.log('Setting auth storage data:', { isAuthenticated, isAdmin, email });
    
    try {
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
        
        // Set cookies with secure flags if possible
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        const sameSite = '; SameSite=Lax';
        
        document.cookie = `session_active=true; path=/; max-age=2592000${secure}${sameSite}`; // 30 days
        
        if (isAdmin) {
          document.cookie = `user_role=admin; path=/; max-age=2592000${secure}${sameSite}`; // 30 days
        } else {
          document.cookie = `user_role=member; path=/; max-age=2592000${secure}${sameSite}`; // 30 days
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
    } catch (error) {
      console.error('Error setting auth storage data:', error);
    }
  },

  /**
   * Clears all authentication data from storage
   */
  clearAuthData: (): void => {
    console.log('Clearing all auth storage data');
    
    try {
      // Clear all auth-related localStorage items
      const authKeys = [
        'isLoggedIn', 'isAdmin', 'userEmail', 'userName', 
        'sb-qrjwfiurwvcsyrcpewsj-auth-token', 'supabase.auth.token',
        'uptownGym_auth_state', 'uptownGym_profile'
      ];
      
      authKeys.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) {
          console.error(`Error removing ${key} from localStorage:`, e);
        }
      });
      
      // Clear cookies
      document.cookie = "session_active=; path=/; max-age=0";
      document.cookie = "user_role=; path=/; max-age=0";
    } catch (error) {
      console.error('Error clearing auth storage data:', error);
    }
  },
  
  /**
   * Gets the current authentication state from storage
   */
  getAuthData: () => {
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      const userEmail = localStorage.getItem('userEmail') || '';
      const userName = localStorage.getItem('userName') || '';
      
      return { isLoggedIn, isAdmin, userEmail, userName };
    } catch (error) {
      console.error('Error getting auth storage data:', error);
      return { isLoggedIn: false, isAdmin: false, userEmail: '', userName: '' };
    }
  },
  
  /**
   * Validates if the stored auth data is consistent
   */
  validateAuthData: () => {
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      
      // Check if session cookie exists
      const hasSessionCookie = document.cookie.split(';').some(item => item.trim().startsWith('session_active='));
      
      // Check if role cookie matches admin status
      const roleMatch = isAdmin 
        ? document.cookie.split(';').some(item => item.trim().startsWith('user_role=admin'))
        : document.cookie.split(';').some(item => item.trim().startsWith('user_role=member'));
      
      return { isConsistent: isLoggedIn === hasSessionCookie && (!isLoggedIn || roleMatch) };
    } catch (error) {
      console.error('Error validating auth storage data:', error);
      return { isConsistent: false };
    }
  }
};
