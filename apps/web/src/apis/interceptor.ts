import { getSession, signOut } from 'next-auth/react';
import { CustomException } from '@gitanimals/exception';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getServerAuth } from '@/auth';
import type { ApiErrorScheme } from '@/exceptions/type';

interface CachedSession {
  accessToken: string;
  expiresAt: number;
}

let cachedSession: CachedSession | null = null;
let sessionPromise: Promise<CachedSession | null> | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getSessionWithCache = async (): Promise<CachedSession | null> => {
  if (cachedSession && Date.now() < cachedSession.expiresAt) {
    return cachedSession;
  }

  if (sessionPromise) {
    return sessionPromise;
  }

  sessionPromise = (async () => {
    try {
      let session;
      if (typeof window !== 'undefined') {
        session = await getSession();
      } else {
        session = await getServerAuth();
      }

      if (session?.user?.accessToken) {
        cachedSession = {
          accessToken: session.user.accessToken,
          expiresAt: Date.now() + CACHE_DURATION,
        };
        return cachedSession;
      }
      return null;
    } finally {
      sessionPromise = null;
    }
  })();

  return sessionPromise;
};

export const interceptorRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  const session = await getSessionWithCache();

  if (!config.headers) return config;

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
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
    if (typeof window !== 'undefined') {
      signOut();
    } else {
      await axios.get('/api/auth/signOut');
      // redirect('/');
    }
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
