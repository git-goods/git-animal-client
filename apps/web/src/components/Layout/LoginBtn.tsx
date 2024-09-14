'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';
import { useClientSession } from '@/utils/clientAuth';

export function LoginOutBtn() {
  const session = useClientSession();

  return session ? <LogoutBtn /> : <LoginBtn />;
}

export function LoginBtn() {
  const t = useTranslations('Layout');

  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return <button onClick={onLogin}>{t('login')}</button>;
}

export function LogoutBtn() {
  const t = useTranslations('Layout');

  const onLogout = async () => {
    await signOut();
  };

  return <Button onClick={onLogout}>{t('logout')}</Button>;
}
