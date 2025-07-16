import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('isAuthenticated: ', isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  console.log('token: ', token);

  // 웹용 localStorage 함수들
  const getWebToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  };

  const setWebToken = (value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', value);
    }
  };

  const deleteWebToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  };

  const checkAuth = async () => {
    try {
      let token: string | null = null;

      if (Platform.OS === 'web') {
        token = getWebToken();
      } else {
        token = await SecureStore.getItemAsync('auth_token');
      }

      console.log('Checking auth token:', token);
      const newAuthState = !!token;
      console.log('Setting auth state to:', newAuthState);
      setIsAuthenticated(newAuthState);
      setToken(token);
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
      if (Platform.OS === 'web') {
        deleteWebToken();
      } else {
        await SecureStore.deleteItemAsync('auth_token');
      }
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 테스트 로그인 함수 추가
  const testLogin = async () => {
    try {
      const testToken = 'test_token_' + Date.now();
      console.log('테스트 토큰 생성:', testToken);

      // 플랫폼에 따라 저장 방식 선택
      if (Platform.OS === 'web') {
        setWebToken(testToken);
      } else {
        await SecureStore.setItemAsync('auth_token', testToken);
      }

      console.log('테스트 토큰 저장 성공');

      // 상태 업데이트
      setIsAuthenticated(true);
      setToken(testToken);
      setIsLoading(false);

      return true;
    } catch (error) {
      console.error('테스트 로그인 실패:', error);
      return false;
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
    testLogin,
    token,
  };
};
