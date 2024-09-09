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
const interceptorResponseRejected = async (error: AxiosError<ApiErrorScheme>) => {
  // console.log('error: ', error.response?.status);
  // if (error.response?.status === 401) {
  //   if (typeof window !== 'undefined') {
  //     signOut();
  //   } else {
  //     axios.get('/api/auth/signOut');
  //   }
  // }

  // 403 처리

  return Promise.reject(error);
};

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(interceptorRequestFulfilled);
  instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

  return instance;
};
