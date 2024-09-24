'use client';

import type { ComponentProps } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';
import { useClientSession } from '@/utils/clientAuth';

type LoginOutBtnProps = Omit<ComponentProps<typeof Button>, 'children' | 'onClick'>;

export function LoginOutBtn(props: LoginOutBtnProps) {
  const { status } = useClientSession();

  return status === 'authenticated' ? <LogoutBtn {...props} /> : <LoginBtn {...props} />;
}

export function LoginBtn(props: LoginOutBtnProps) {
  const t = useTranslations('Layout');

  const onLogin = async () => {
    await getGithubOauthUrl();
  };

  return (
    <Button onClick={onLogin} {...props}>
      {t('login')}
    </Button>
  );
}

export function LogoutBtn(props: LoginOutBtnProps) {
  const t = useTranslations('Layout');

  const onLogout = async () => {
    await signOut();
  };

  return (
    <Button onClick={onLogout} {...props}>
      {t('logout')}
    </Button>
  );
}
