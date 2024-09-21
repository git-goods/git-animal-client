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
    <div>
      <Button onClick={onLogin} className="desktop" size="l">
        {children}
      </Button>
      <Button onClick={onLogin} className="mobile" size="m">
        {children}
      </Button>
    </div>
  );
}

export default LoginButton;
