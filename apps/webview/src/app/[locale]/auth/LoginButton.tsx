'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { ROUTE } from '@/constants/route';

function LoginButton({ jwtToken }: { jwtToken: string }) {
  // const jwtToken = searchParams.jwt;
  const token = jwtToken.split(' ')[1];

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      console.log('[Auth Debug] LoginButton: Token received', { tokenLength: token?.length });
      ref.current.click();
    }
  }, [token]);

  const handleLogin = async () => {
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
