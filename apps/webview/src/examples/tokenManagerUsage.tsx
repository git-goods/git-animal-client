/**
 * Token Manager Usage Examples
 * 
 * This file demonstrates how to use the token manager, auth utilities, and API client
 * in the webview application.
 */

import React, { useState, useEffect } from 'react';
import { tokenManager, authUtils, apiClient, authAPI, userAPI, setupWebViewMessageHandler } from '../utils';

// 1. 기본 인증 상태 확인
export const checkAuthStatus = () => {
  console.log('Authenticated:', authUtils.isAuthenticated());
  console.log('Token Info:', authUtils.getTokenInfo());
};

// 2. React 컴포넌트에서 인증 상태 모니터링
export const useAuthStateMonitoring = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 초기 상태 설정
    setIsAuthenticated(authUtils.isAuthenticated());

    // 인증 상태 변경 감지
    const unsubscribe = authUtils.onAuthStateChange((authState: boolean) => {
      setIsAuthenticated(authState);
    });

    // cleanup
    return unsubscribe;
  }, []);

  return isAuthenticated;
};

// 3. 웹뷰에서 부모 앱과 통신 설정
export const initializeWebViewCommunication = () => {
  // 메시지 핸들러 설정
  const cleanup = setupWebViewMessageHandler();

  // 부모 앱에 인증 요청
  if (!authUtils.isAuthenticated()) {
    authUtils.requestAuthFromParent();
  }

  return cleanup;
};

// 4. API 호출 예시
export const apiUsageExamples = {
  // 사용자 프로필 가져오기
  getUserProfile: async () => {
    try {
      const response = await userAPI.getProfile();
      console.log('User profile:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error;
    }
  },

  // 사용자 정보 업데이트
  updateUserProfile: async (profileData: any) => {
    try {
      const response = await userAPI.updateProfile(profileData);
      console.log('Profile updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  // 커스텀 API 호출
  customAPICall: async () => {
    try {
      const response = await apiClient.get('/custom-endpoint');
      console.log('Custom API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Custom API call failed:', error);
      throw error;
    }
  }
};

// 5. 로그인/로그아웃 처리
export const authActions = {
  // 부모 앱으로부터 토큰 받기 (웹뷰 환경)
  handleTokensFromParent: (accessToken: string, refreshToken?: string) => {
    authUtils.setTokensFromParent(accessToken, refreshToken);
    console.log('Tokens set from parent app');
  },

  // 로그아웃
  logout: () => {
    authUtils.logout();
    console.log('User logged out');
  },

  // 토큰 수동 갱신
  refreshTokens: async () => {
    try {
      const success = await authUtils.refreshToken();
      console.log('Token refresh result:', success);
      return success;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }
};

// 6. React 컴포넌트에서 사용하는 훅 예시
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 웹뷰 통신 초기화
    const cleanup = initializeWebViewCommunication();

    // 초기 인증 상태 확인
    setIsAuthenticated(authUtils.isAuthenticated());
    setIsLoading(false);

    // 인증 상태 모니터링
    const unsubscribe = authUtils.onAuthStateChange((authState: boolean) => {
      setIsAuthenticated(authState);
    });

    return () => {
      cleanup?.();
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please authenticate in the parent app</div>;
  }

  return <>{children}</>;
};