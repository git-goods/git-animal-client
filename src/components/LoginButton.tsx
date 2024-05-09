import type { PropsWithChildren } from 'react';
import React from 'react';

import { GITHUB_OAUTH_REQUEST_URL } from '@/constants/oauth';
import { useUser } from '@/store/user';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const { isLogin } = useUser();

  if (isLogin) return children;

  return (
    <a href={GITHUB_OAUTH_REQUEST_URL} onClick={(e) => e.stopPropagation()}>
      {children}
    </a>
  );
}

export default LoginButton;
