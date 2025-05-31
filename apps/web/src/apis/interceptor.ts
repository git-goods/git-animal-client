import { getSession, signOut } from 'next-auth/react';
import { CustomException } from '@gitanimals/exception';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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
  return res;
};

// Response interceptor
export const interceptorResponseRejected = async (error: AxiosError<ApiErrorScheme>) => {
  if (error?.response?.status === 401) {
    if (typeof window !== 'undefined') {
      signOut();
    }
    throw new CustomException('TOKEN_EXPIRED', 'token expired and sign out success');
  }

  // TODO: 403 처리

  return Promise.reject(error);
};

export const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(interceptorRequestFulfilled);
  if (typeof window !== 'undefined') {
    // 클라이언트에서만 리다이렉트 감지 인터셉터 등록
    instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);
  } else {
    // 서버에서는 기본 응답만 반환 (항상 res 반환)
    instance.interceptors.response.use((res) => res, interceptorResponseRejected);
  }
  return instance;
};
