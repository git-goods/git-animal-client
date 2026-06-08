'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { LOCAL_STORAGE_KEY, SESSION_STORAGE_KEY } from '@/constants/storage';

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
    // complete_login 이벤트는 로그인 성공 직후 redirect(true)로 페이지가 즉시 전환되어
    // 이 자리에서 직접 트래킹할 수 없다. 대신 "방금 로그인함" 플래그를 sessionStorage에 남겨두고,
    // 리다이렉트된 페이지에서 세션이 authenticated로 잡히는 시점에 useSyncAnalyticsUser가 1회 발사한다.
    sessionStorage.setItem(SESSION_STORAGE_KEY.justLoggedIn, 'true');

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
