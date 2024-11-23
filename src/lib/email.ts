// Simple token generation for development
const generateRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateVerificationToken = (email: string): string => {
  const token = generateRandomString(32);
  // Store the token and email in localStorage for development
  const verificationData = JSON.parse(localStorage.getItem('verificationTokens') || '{}');
  verificationData[token] = {
    email,
    expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  localStorage.setItem('verificationTokens', JSON.stringify(verificationData));
  return token;
};

export const verifyToken = (token: string): { email: string } | null => {
  const verificationData = JSON.parse(localStorage.getItem('verificationTokens') || '{}');
  const tokenData = verificationData[token];
  
  if (!tokenData) return null;
  if (tokenData.expires < Date.now()) return null;
  
  // Remove the used token
  delete verificationData[token];
  localStorage.setItem('verificationTokens', JSON.stringify(verificationData));
  
  return { email: tokenData.email };
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${window.location.origin}/verify-email?token=${token}`;
  
  // In development, log the verification link
  console.log('Verification Link:', verificationLink);
  
  // Simulate a delay to mimic email sending
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return true;
};