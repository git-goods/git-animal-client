'use client';

import type { PropsWithChildren } from 'react';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';
import { useClientSession } from '@/utils/clientAuth';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const session = useClientSession();

  const onLogin = async () => {
    const url = await getGithubOauthUrl();
    window.location.assign(url);
  };

  // if (session.status === 'loading') return <div>loading...</div>;

  // if (session.status === 'authenticated') return <Link href="/mypage">{children}</Link>;

  if (session.status === 'unauthenticated') {
    return <button onClick={onLogin}>{children}</button>;
  }
  return <></>;
}

export default LoginButton;
