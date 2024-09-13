import { getSession, signOut } from 'next-auth/react';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getServerAuth } from '@/auth';
import type { ApiErrorScheme } from '@/exceptions/type';

export const interceptorRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  let session;
  if (typeof window !== 'undefined') {
    // session for client component
    session = await getSession();
  } else {
    // session for server component
    session = await getServerAuth();
  }

  const accessToken = session?.user?.accessToken;
  if (!config.headers) return config;

  if (accessToken) {
    console.log('accessToken: ', accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

// Response interceptor
export const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

// Response interceptor
export const interceptorResponseRejected = async (error: AxiosError<ApiErrorScheme>) => {
  // console.log('error: ', error.response?.status);
  if (error.response?.status === 401) {
    if (typeof window !== 'undefined') {
      signOut();
    } else {
      axios.get('/api/auth/signOut');
    }
  }

  // TODO: 403 처리

  return Promise.reject(error);
};
