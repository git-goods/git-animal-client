'use client';

import type { PropsWithChildren } from 'react';
import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';
import { useClientSession } from '@/utils/clientAuth';

interface LoginButtonProps {}

function LoginButton({ children }: PropsWithChildren<LoginButtonProps>) {
  const session = useClientSession();

  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  if (session.status !== 'unauthenticated') return <></>;

  return (
    <button onClick={onLogin}>
      <Button className="desktop" size="l">
        {children}
      </Button>
      <Button className="mobile" size="m">
        {children}
      </Button>
    </button>
  );
}

export default LoginButton;
