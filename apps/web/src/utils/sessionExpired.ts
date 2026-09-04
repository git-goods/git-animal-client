import { atom, getDefaultStore } from 'jotai';

export interface SessionExpiredState {
  open: boolean;
  callbackUrl: string | null;
}

export const sessionExpiredAtom = atom<SessionExpiredState>({
  open: false,
  callbackUrl: null,
});

// `/auth` 자체와 `/{locale}/auth` 만 인증 경로로 인정 — `/author` 등 오탐 방지 위해 세그먼트 경계(/|$) 기준.
const isAuthPath = (pathname: string) => /^(\/[^/]+)?\/auth(\/|$)/.test(pathname);

export const triggerSessionExpired = (callbackUrl?: string | null) => {
  if (typeof window === 'undefined') return;

  if (isAuthPath(window.location.pathname)) return;

  const store = getDefaultStore();
  const current = store.get(sessionExpiredAtom);
  if (current.open) return;

  store.set(sessionExpiredAtom, {
    open: true,
    callbackUrl: callbackUrl ?? window.location.pathname + window.location.search,
  });
};

export const resetSessionExpired = () => {
  const store = getDefaultStore();
  store.set(sessionExpiredAtom, { open: false, callbackUrl: null });
};

// 라우트 에러 경계로 넘어간 뒤엔 CustomException 인스턴스가 아니라 직렬화된 객체라 instanceof 로 못 잡는다.
export const isTokenExpiredError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;

  const { name, code, message } = error as { name?: unknown; code?: unknown; message?: unknown };

  if (code === 'TOKEN_EXPIRED') return true;
  return name === 'CustomException' && message === 'token expired';
};
