import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@gitanimals/react-query';
import { installInterceptors } from './interceptors';
import { normalizeToken, tokenStore } from './tokenStore';

type Status = 'loading' | 'signedIn' | 'signedOut';

type Auth = {
  status: Status;
  signIn(token: string): Promise<void>;
  signOut(): Promise<void>;
};

const AuthContext = createContext<Auth | null>(null);

const isUnauthorized = (e: unknown) => (e as { response?: { status?: number } })?.response?.status === 401;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<Status>('loading');
  const tokenRef = useRef<string | null>(null);

  const signOut = useCallback(async () => {
    tokenRef.current = null;
    await tokenStore.clear();
    queryClient.clear();
    setStatus('signedOut');
  }, [queryClient]);

  const signOutRef = useRef(signOut);
  useEffect(() => {
    signOutRef.current = signOut;
  }, [signOut]);

  // 401 이면 로그아웃, 그 밖의 오류(오프라인 등)는 토큰을 유지한 채 로그인 상태로 둔다.
  const validate = useCallback(async () => {
    try {
      await queryClient.fetchQuery(userQueries.userOptions());
      setStatus('signedIn');
    } catch (e) {
      if (isUnauthorized(e)) await signOutRef.current();
      else setStatus('signedIn');
    }
  }, [queryClient]);

  useEffect(() => {
    installInterceptors({
      getToken: () => tokenRef.current,
      onUnauthorized: () => void signOutRef.current(),
    });

    let cancelled = false;
    (async () => {
      try {
        const stored = await tokenStore.get();
        if (cancelled) return;
        if (!stored) {
          setStatus('signedOut');
          return;
        }
        tokenRef.current = stored;
        await validate();
      } catch {
        // Keystore 복호화 실패 등 — 로딩에 갇히지 않도록 로그아웃 상태로 둔다
        tokenRef.current = null;
        await tokenStore.clear().catch(() => {});
        if (!cancelled) setStatus('signedOut');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [validate]);

  const signIn = useCallback(
    async (token: string) => {
      const normalized = normalizeToken(token);
      await tokenStore.set(normalized);
      tokenRef.current = normalized;
      try {
        await queryClient.fetchQuery(userQueries.userOptions());
        setStatus('signedIn');
      } catch (e) {
        if (isUnauthorized(e)) {
          await signOutRef.current();
          throw new Error('유효하지 않은 토큰입니다');
        }
        setStatus('signedIn');
      }
    },
    [queryClient],
  );

  const value = useMemo(() => ({ status, signIn, signOut }), [status, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): Auth {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 는 AuthProvider 안에서만 쓴다');
  return ctx;
}
