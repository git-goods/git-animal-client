import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import tokenManager from './tokenManager';
import authUtils from './authUtils';

// 커스텀 인터페이스 확장 (향후 재시도 로직에서 사용 예정)
// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

/**
 * 요청 인터셉터 - 모든 요청에 토큰 헤더 추가 (토큰이 준비될 때까지 대기)
 */
export const interceptorRequestFulfilled = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  try {
    // 토큰이 준비될 때까지 대기
    await tokenManager.waitForToken();

    const token = authUtils.getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error('Token wait failed:', error);

    // 토큰 대기 실패 시 webview 환경에서는 부모에게 인증 요청
    if (window.ReactNativeWebView) {
      authUtils.requestAuthFromParent();
    }

    // 토큰이 없으면 요청을 취소하고 에러를 던짐
    throw new Error('Authentication required');
  }
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
  // const originalRequest = error.config as CustomAxiosRequestConfig;

  // 401 에러 (인증 실패) 처리
  // if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
  //   originalRequest._retry = true;

  //   try {
  //     // 토큰 갱신 시도
  //     const refreshSuccess = await tokenManager.refreshAccessToken();

  //     if (refreshSuccess && originalRequest.headers) {
  //       // 새 토큰으로 헤더 업데이트
  //       const newToken = tokenManager.getAccessToken();
  //       originalRequest.headers.Authorization = `Bearer ${newToken}`;

  //       // 원래 요청 재시도
  //       const axios = (await import('axios')).default;
  //       return axios(originalRequest);
  //     }
  //   } catch (refreshError) {
  //     console.error('Token refresh failed:', refreshError);
  //     // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
  //     tokenManager.clearTokens();

  //     if (window.ReactNativeWebView) {
  //       window.ReactNativeWebView.postMessage(
  //         JSON.stringify({
  //           type: 'AUTH_REQUIRED',
  //           message: 'Authentication required',
  //         }),
  //       );
  //     }
  //   }
  // }

  return Promise.reject(error);
};
