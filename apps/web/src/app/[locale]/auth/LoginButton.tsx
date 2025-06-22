'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';

function LoginButton({ token }: { token: string }) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.click();
      localStorage.setItem('accessToken', token);
    }
  }, [token]);

  const callbackUrl = localStorage.getItem(LOCAL_STORAGE_KEY.callbackUrl) || '/mypage';

  const handleLogin = async () => {
    await signIn('web-credentials', {
      token,
      callbackUrl,
      redirect: true,
    });
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
