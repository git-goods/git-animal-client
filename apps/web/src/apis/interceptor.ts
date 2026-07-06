import { getSession, signOut } from 'next-auth/react';
import {
  setRenderRequestInterceptor,
  setRenderResponseInterceptor,
  setRequestInterceptor,
  setResponseInterceptor,
} from '@gitanimals/api';
import { CustomException } from '@gitanimals/exception';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getServerAuth } from '@/auth';
import type { ApiErrorScheme } from '@/exceptions/type';

interface CachedSession {
  accessToken: string;
  expiresAt: number;
}

// Client-only module-global cache. The browser global is per-user, so caching
// here is safe. It MUST NOT be shared on the server, where a single module
// instance is shared across concurrent requests from different users.
let cachedSession: CachedSession | null = null;
let sessionPromise: Promise<CachedSession | null> | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getSessionWithCache = async (): Promise<CachedSession | null> => {
  // Server path: never touch module-global state. getServerAuth() reads
  // request-scoped cookies, so resolve per request (a JWT decode per call).
  if (typeof window === 'undefined') {
    const session = await getServerAuth();
    if (session?.user?.accessToken) {
      return {
        accessToken: session.user.accessToken,
        expiresAt: Date.now() + CACHE_DURATION,
      };
    }
    return null;
  }

  if (cachedSession && Date.now() < cachedSession.expiresAt) {
    return cachedSession;
  }

  if (sessionPromise) {
    return sessionPromise;
  }

  sessionPromise = (async () => {
    try {
      const session = await getSession();

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

let registered = false;

/**
 * Attaches the request/response interceptors to the shared @gitanimals/api
 * instances exactly once. Idempotent: safe to call from multiple module scopes
 * (server root layout, client provider) without stacking handlers.
 */
export const registerInterceptors = () => {
  if (registered) return;
  registered = true;

  setRequestInterceptor(interceptorRequestFulfilled);
  setResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
  setRenderRequestInterceptor(interceptorRequestFulfilled);
  setRenderResponseInterceptor(interceptorResponseFulfilled, interceptorResponseRejected);
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
