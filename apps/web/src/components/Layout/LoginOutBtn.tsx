'use client';

import type { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Button } from '@gitanimals/ui-panda';

import { useClientSession } from '@/utils/clientAuth';

import { login, logout } from '../AuthButton';

type LoginOutBtnProps = Omit<ComponentProps<typeof Button>, 'children' | 'onClick'>;

export function LoginOutBtn(props: LoginOutBtnProps) {
  const { status } = useClientSession();

  return status === 'authenticated' ? <LogoutBtn {...props} /> : <LoginBtn {...props} />;
}

export function LoginBtn(props: LoginOutBtnProps) {
  const t = useTranslations('Layout');

  return (
    <Button onClick={login} {...props}>
      {t('login')}
    </Button>
  );
}

export function LogoutBtn(props: LoginOutBtnProps) {
  const t = useTranslations('Layout');

  return (
    <Button onClick={logout} {...props}>
      {t('logout')}
    </Button>
  );
}
