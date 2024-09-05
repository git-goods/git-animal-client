'use client';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

function LoginBtn() {
  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return <button onClick={onLogin}>Login</button>;
}

export default LoginBtn;
