'use client';

import { useTranslations } from 'next-intl';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

function LoginBtn() {
  const t = useTranslations('Layout');
  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return <button onClick={onLogin}>{t('login')}</button>;
}

export default LoginBtn;
