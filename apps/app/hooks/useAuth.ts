import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('isAuthenticated: ', isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  console.log('token: ', token);

  const normalizeToken = (rawToken: string | null) => {
    if (!rawToken) return null;
    return rawToken.replace(/^bearer\s+/i, '').trim();
  };

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

      const cleanedToken = normalizeToken(token);
      console.log('Checking auth token:', cleanedToken);
      const newAuthState = !!cleanedToken;
      console.log('Setting auth state to:', newAuthState);
      setIsAuthenticated(newAuthState);
      setToken(cleanedToken);
      // 스토리지에 bearer 접두사가 들어간 경우 정규화하여 저장
      if (cleanedToken && cleanedToken !== token) {
        if (Platform.OS === 'web') {
          setWebToken(cleanedToken);
        } else {
          await SecureStore.setItemAsync('auth_token', cleanedToken);
        }
      }
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
      console.log('[Auth Debug] Starting logout process');
      if (Platform.OS === 'web') {
        deleteWebToken();
      } else {
        await SecureStore.deleteItemAsync('auth_token');
      }
      console.log('[Auth Debug] Token deleted, updating state');
      setIsAuthenticated(false);
      setToken(null);
      console.log('[Auth Debug] Logout completed, isAuthenticated:', false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 테스트 로그인 함수 추가
  const testLogin = async (rawToken: string) => {
    try {
      const testToken = normalizeToken(rawToken) ?? '';
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
