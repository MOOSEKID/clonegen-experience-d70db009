
/**
 * Authentication utilities for member management
 */

// Generate a username based on member name
export const generateUsername = (name: string): string => {
  if (!name) return '';
  
  // Remove any special characters and spaces, convert to lowercase
  const cleanName = name.toLowerCase().replace(/[^\w\s]/gi, '');
  
  // Split into first and last name
  const nameParts = cleanName.split(' ');
  
  if (nameParts.length >= 2) {
    // Use first name and last name format: firstname.lastname
    return `${nameParts[0]}.${nameParts[nameParts.length - 1]}`;
  } else {
    // Just use the name if there's only one part
    return nameParts[0];
  }
};

// Make a username unique by adding a number if needed
export const makeUsernameUnique = (
  baseUsername: string, 
  existingUsernames: string[]
): string => {
  // If the username doesn't exist yet, return it as is
  if (!existingUsernames.includes(baseUsername)) {
    return baseUsername;
  }
  
  // Add incrementing numbers until we find a unique username
  let counter = 1;
  let newUsername = `${baseUsername}${counter}`;
  
  while (existingUsernames.includes(newUsername)) {
    counter++;
    newUsername = `${baseUsername}${counter}`;
  }
  
  return newUsername;
};

// Generate a secure temporary password
export const generateTemporaryPassword = (length = 12): string => {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%^&*-_=+';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  
  // Ensure at least one of each character type
  let password = 
    uppercase.charAt(Math.floor(Math.random() * uppercase.length)) +
    lowercase.charAt(Math.floor(Math.random() * lowercase.length)) +
    numbers.charAt(Math.floor(Math.random() * numbers.length)) +
    symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  // Fill the rest with random characters
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle the password characters
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};

// Send credentials to a member via email (mock implementation)
export const sendCredentialsByEmail = (
  email: string, 
  username: string, 
  password: string
): Promise<boolean> => {
  console.log(`Sending credentials to ${email}: Username: ${username}, Password: ${password}`);
  
  // In a real implementation, you would use an email service
  // For now, we'll just simulate success
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

// Send credentials to a member via SMS (mock implementation)
export const sendCredentialsBySMS = (
  phone: string, 
  username: string, 
  password: string
): Promise<boolean> => {
  console.log(`Sending credentials to ${phone}: Username: ${username}, Password: ${password}`);
  
  // In a real implementation, you would use an SMS service
  // For now, we'll just simulate success
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
