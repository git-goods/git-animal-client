'use client';

import React from 'react';
import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

function LoginButton() {
  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return <Button onClick={() => onLogin()}>Login</Button>;
}

export default LoginButton;
