import { cache } from 'react';
import { getSession } from 'next-auth/react';
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
import { triggerSessionExpired } from '@/utils/sessionExpired';

// Server path: request-scoped memoization via React cache(). Deduped within a
// single render (one JWT decode instead of one per outbound request), and never
// shared across concurrent requests from different users.
const getServerAccessToken = cache(async (): Promise<string | null> => {
  const session = await getServerAuth();
  return session?.user?.accessToken ?? null;
});

// Client-only module-global cache. The browser global is per-user, so caching
// here is safe. It MUST NOT be shared on the server, where a single module
// instance is shared across concurrent requests from different users — the
// server path above deliberately uses request-scoped cache() instead.
interface CachedSession {
  accessToken: string;
  expiresAt: number;
}
let cachedSession: CachedSession | null = null;
let sessionPromise: Promise<string | null> | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const clearSessionCache = () => {
  cachedSession = null;
  sessionPromise = null;
};

const getAccessToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') {
    return getServerAccessToken();
  }

  if (cachedSession && Date.now() < cachedSession.expiresAt) {
    return cachedSession.accessToken;
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
        return cachedSession.accessToken;
      }
      return null;
    } finally {
      sessionPromise = null;
    }
  })();

  return sessionPromise;
};

export const interceptorRequestFulfilled = async (config: InternalAxiosRequestConfig) => {
  const accessToken = await getAccessToken();

  if (!config.headers) return config;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
    // 캐시 무효화는 환경과 무관하게 먼저 수행 — 만료된 토큰 재사용 방지.
    clearSessionCache();
    // 복구 UX(세션 만료 다이얼로그)는 클라이언트에서만 띄운다.
    if (typeof window !== 'undefined') {
      triggerSessionExpired(window.location.pathname + window.location.search);
    }
    throw new CustomException('TOKEN_EXPIRED', 'token expired');
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
