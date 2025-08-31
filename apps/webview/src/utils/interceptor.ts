import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import tokenManager from './tokenManager';

// 커스텀 인터페이스 확장
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * 요청 인터셉터 - 모든 요청에 토큰 헤더 추가
 */
export const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = tokenManager.getAccessToken();
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

/**
 * 응답 인터셉터 - 성공한 응답 처리
 */
export const interceptorResponseFulfilled = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * 응답 인터셉터 - 에러 응답 처리
 */
export const interceptorResponseRejected = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config as CustomAxiosRequestConfig;

  // 401 에러 (인증 실패) 처리
  if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // 토큰 갱신 시도
      const refreshSuccess = await tokenManager.refreshAccessToken();
      
      if (refreshSuccess && originalRequest.headers) {
        // 새 토큰으로 헤더 업데이트
        const newToken = tokenManager.getAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // 원래 요청 재시도
        const axios = (await import('axios')).default;
        return axios(originalRequest);
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
      tokenManager.clearTokens();
      
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'AUTH_REQUIRED',
          message: 'Authentication required'
        }));
      }
    }
  }

  return Promise.reject(error);
};