'use client';
import type { PropsWithChildren } from 'react';

import { GITHUB_OAUTH_REQUEST_URL } from '@/constants/oauth';
import { useUser } from '@/store/user';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const { isLogin } = useUser(); // TODO: useUser 제거

  if (isLogin) return children;

  return <a href={GITHUB_OAUTH_REQUEST_URL}>{children}</a>;
}

export default LoginButton;
