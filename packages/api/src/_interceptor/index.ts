import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ApiErrorScheme } from '../type';

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  // TODO: cookie 처리 시 변경 필요
  // const accessToken = getToken();
  if (!config.headers) return config;
  // if (!accessToken) return config;

  // config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

// Response interceptor
const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

// Response interceptor
const interceptorResponseRejected = (error: AxiosError<ApiErrorScheme>) => {
  if (error.response?.status === 401) {
    // TODO : logout and refresh login
    // TODO : logout 안내
  }

  // 403 처리

  return Promise.reject(error);
};

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(interceptorRequestFulfilled);
  instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

  return instance;
};
