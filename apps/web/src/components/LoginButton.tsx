'use client';

import type { PropsWithChildren } from 'react';
import Link from 'next/link';

import { useClientSession } from '@/utils/clientAuth';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const session = useClientSession();

  const onLogin = async () => {
    const res = await fetch('http://localhost:3000/api/oauth');
    const data = await res.json();
    console.log('data: ', data);
    window.location.assign(data.url);
  };

  if (session) return <Link href="/mypage">{children}</Link>;

  return <div onClick={onLogin}>{children}</div>;
}

export default LoginButton;
