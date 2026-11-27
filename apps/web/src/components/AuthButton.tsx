'use client';

import type { ComponentProps, JSX } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-tailwind';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';
import { COOKIE_KEY, LOCAL_STORAGE_KEY } from '@/constants/storage';

export const login = (callbackUrl?: string) => {
  // 인자가 없으면(예: 헤더 로그인 버튼) 미들웨어가 심어둔 딥링크 복귀 경로를 우선 사용한다.
  const target = callbackUrl ?? localStorage.getItem(LOCAL_STORAGE_KEY.callbackUrl) ?? '/mypage';
  localStorage.setItem(LOCAL_STORAGE_KEY.callbackUrl, target);

  // cookie set (client)
  const currentLocale = window.location.pathname.split('/')[1];
  document.cookie = `${COOKIE_KEY.locale}=${currentLocale}; path=/; max-age=3600`;

  // sessionStorage.setItem(SESSION_STORAGE_KEY.locale, currentLocale);

  getGithubOauthUrl();
};

export const logout = () => signOut();

export function RenderLoginButton({
  render,
}: {
  render: (props: { label: string; onClick: () => void }) => JSX.Element;
}): JSX.Element {
  const t = useTranslations('Layout');

  return render({ label: t('login'), onClick: () => login() });
}

export function RenderLogoutButton({
  render,
}: {
  render: (props: { label: string; onClick: () => void }) => JSX.Element;
}): JSX.Element {
  const t = useTranslations('Layout');

  return render({ label: t('logout'), onClick: logout });
}

export function LoginButton(props: Omit<ComponentProps<typeof Button>, 'children' | 'onClick'> & { label?: string }) {
  return (
    <RenderLoginButton
      render={({ label, onClick }) => (
        <Button onClick={onClick} {...props}>
          {props.label || label}
        </Button>
      )}
    />
  );
}

export function LogoutButton(props: Omit<ComponentProps<typeof Button>, 'children' | 'onClick'>) {
  return (
    <RenderLogoutButton
      render={({ label, onClick }) => (
        <Button onClick={onClick} {...props}>
          {label}
        </Button>
      )}
    />
  );
}
