import { CustomException } from '@gitanimals/exception';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import tokenManager from './tokenManager';
import authUtils from './authUtils';

export interface ApiErrorScheme {
  message: string;
}

export const interceptorRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  const session = tokenManager.getAccessToken();

  if (!config.headers) return config;

  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }

  return config;
};

// Response interceptor
export const interceptorResponseFulfilled = (res: AxiosResponse) => {
  // if (200 <= res.status && res.status < 300) {
  //   return res.data;
  // }

  // return Promise.reject(res.data);
  return res;
};

// Response interceptor
export const interceptorResponseRejected = async (error: AxiosError<ApiErrorScheme>) => {
  if (error?.response?.status === 401) {
    authUtils.logout();

    throw new CustomException('TOKEN_EXPIRED', 'token expired and sign out success');
  }

  // TODO: 403 처리

  return Promise.reject(error);
};

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(interceptorRequestFulfilled);
  instance.interceptors.response.use((res) => {
    if (200 <= res.status && res.status < 300) {
      return res.data;
    }

    return Promise.reject(res.data);
  }, interceptorResponseRejected);
  return instance;
};
