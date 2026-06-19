import { atom, getDefaultStore } from 'jotai';

export interface SessionExpiredState {
  open: boolean;
  callbackUrl: string | null;
}

export const sessionExpiredAtom = atom<SessionExpiredState>({
  open: false,
  callbackUrl: null,
});

const isAuthPath = (pathname: string) => pathname.startsWith('/auth') || /^\/[^/]+\/auth(\/|$)/.test(pathname);

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
