'use client';
import type { PropsWithChildren } from 'react';

import { useUser } from '@/store/user';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const { isLogin } = useUser(); // TODO: useUser 제거

  const onLogin = async () => {
    const res = await fetch('/api/oauth');
    const data = await res.json();
    window.location.assign(data.url);
  };

  if (isLogin) return children;

  return <button onClick={onLogin}>{children}</button>;
}

export default LoginButton;
