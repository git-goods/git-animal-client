import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('isAuthenticated: ', isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      console.log('Checking auth token:', token);
      const newAuthState = !!token;
      console.log('Setting auth state to:', newAuthState);
      setIsAuthenticated(newAuthState);
      return newAuthState;
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    checkAuth,
    logout,
  };
};
