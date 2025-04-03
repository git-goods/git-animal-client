'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';

function LoginButton({ token }: { token: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      console.log('[Auth Debug] LoginButton: Token received', { tokenLength: token?.length });
      ref.current.click();
      localStorage.setItem('accessToken', token);
    }
  }, [token]);

  const callbackUrl = localStorage.getItem(LOCAL_STORAGE_KEY.callbackUrl) || '/mypage';

  const handleLogin = async () => {
    console.log('[Auth Debug] LoginButton: Signing in with token', { tokenLength: token?.length });
    try {
      const result = await signIn('web-credentials', {
        token,
        callbackUrl,
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
