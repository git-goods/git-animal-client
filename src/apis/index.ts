import type { AxiosError } from 'axios';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

import type { ApiErrorScheme } from '@/exceptions/type';
import { getToken, logout } from '@/store/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') return config;

  const accessToken = getToken();
  if (!config.headers) return config;
  if (!accessToken) return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

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
    logout();
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};
