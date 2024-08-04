'use client';
import type { PropsWithChildren } from 'react';
import Link from 'next/link';

import { useUser } from '@/store/user';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const { isLogin } = useUser(); // TODO: useUser 제거

  const onLogin = async () => {
    const res = await fetch('/api/oauth');
    const data = await res.json();
    window.location.assign(data.url);
  };

  if (isLogin) return <Link href="/mypage">{children}</Link>;

  return <div onClick={onLogin}>{children}</div>;
}

export default LoginButton;
