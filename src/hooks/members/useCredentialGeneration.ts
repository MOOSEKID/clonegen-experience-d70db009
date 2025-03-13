
import { 
  generateUsername, 
  makeUsernameUnique, 
  generateTemporaryPassword,
  sendCredentialsByEmail,
  sendCredentialsBySMS
} from '@/utils/authUtils';

interface CredentialOptions {
  generateUsername: boolean;
  username?: string;
  generateTemporaryPassword: boolean;
  temporaryPassword?: string;
  sendCredentials: boolean;
}

export const useCredentialGeneration = (getAllUsernames: () => string[]) => {
  
  const generateMemberCredentials = async (
    options: CredentialOptions,
    name: string,
    email?: string,
    phone?: string
  ) => {
    let username = '';
    let tempPassword = '';
    
    // Create username based on name
    if (options.generateUsername) {
      const baseUsername = generateUsername(name);
      username = makeUsernameUnique(baseUsername, getAllUsernames());
    } else {
      // Use the provided username
      username = options.username || '';
      
      // Check if username already exists
      if (getAllUsernames().includes(username)) {
        throw new Error(`Username "${username}" is already taken. Please choose a different username.`);
      }
    }
    
    // Generate or use provided password
    if (options.generateTemporaryPassword) {
      tempPassword = generateTemporaryPassword();
    } else {
      tempPassword = options.temporaryPassword || '';
    }
    
    // Send credentials if requested
    if (options.sendCredentials) {
      if (email) {
        await sendCredentialsByEmail(email, username, tempPassword);
      }
      
      if (phone) {
        await sendCredentialsBySMS(phone, username, tempPassword);
      }
    }
    
    return { username, tempPassword };
  };
  
  return { generateMemberCredentials };
};
