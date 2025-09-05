'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { ROUTE } from '@/constants/route';

function LoginButton({ jwtToken }: { jwtToken: string }) {
  // const jwtToken = searchParams.jwt;

  console.log('[Auth Debug] LoginButton: jwtToken', jwtToken);
  // 'bearer <jwt>' 또는 순수 JWT 모두 지원
  const token = (jwtToken || '').trim().replace(/^bearer\s+/i, '');

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current && token) {
      console.log('[Auth Debug] LoginButton: Token received', { tokenLength: token?.length });
      ref.current.click();
    }
  }, [token]);

  const handleLogin = async () => {
    if (!token) {
      console.warn('[Auth Debug] LoginButton: Empty token, skip signIn');
      return;
    }
    console.log('[Auth Debug] LoginButton: Signing in with token', { tokenLength: token?.length });
    try {
      const result = await signIn('web-credentials', {
        token,
        callbackUrl: ROUTE.HOME(),
        redirect: true,
      });
      console.log('[Auth Debug] LoginButton: SignIn result', result);
    } catch (error) {
      console.error('[Auth Debug] LoginButton: SignIn error', error);
    }
  };

  return (
    <div>
      <button ref={ref} onClick={handleLogin}>
        LogIn
      </button>
    </div>
  );
}

export default LoginButton;
