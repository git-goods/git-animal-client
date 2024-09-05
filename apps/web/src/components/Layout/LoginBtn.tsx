'use client';

import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

function LoginBtn() {
  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return <Button onClick={onLogin}>Login</Button>;
}

export default LoginBtn;
