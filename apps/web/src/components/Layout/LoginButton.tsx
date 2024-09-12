'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

function LoginButton() {
  const t = useTranslations('Layout');

  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return <Button onClick={() => onLogin()}>{t('login')}</Button>;
}

export default LoginButton;
