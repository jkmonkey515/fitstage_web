import { AuthError } from '@supabase/supabase-js';

export const getAuthErrorMessage = (error: AuthError | Error | unknown): string => {
  if (!error) return 'An unknown error occurred';

  const err = error as AuthError;
  
  if (err.__isAuthError) {
    switch (err.status) {
      case 504:
        return 'Connection timeout. Please check your internet connection and try again.';
      case 429:
        return 'Too many attempts. Please wait a few minutes and try again.';
      case 400:
        if (err.message.includes('credentials')) {
          return 'Invalid email or password. Please check your credentials and try again.';
        }
        if (err.message.includes('password')) {
          return 'Password must be at least 6 characters long.';
        }
        if (err.message.includes('email')) {
          return 'Please enter a valid email address.';
        }
        return 'Invalid login credentials. Please try again.';
      case 401:
        return 'Invalid credentials. Please check your email and password.';
      case 422:
        return 'Invalid email format. Please check your email address.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return err.message || 'Authentication error. Please try again.';
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return 'An unexpected error occurred. Please try again.';
}