import { signOut } from 'next-auth/react';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import type { ApiErrorScheme } from '@/exceptions/type';

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  const accessToken = localStorage.getItem('accessToken');
  if (!config.headers) return config;
  if (!accessToken) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

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
    // logout();
    // TODO : logout 안내
    if (typeof window !== 'undefined') {
      signOut();
    }
  }

  // 403 처리

  return Promise.reject(error);
};

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(interceptorRequestFulfilled);
  instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

  return instance;
};
