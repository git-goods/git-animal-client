'use client';

import type { JSX } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

/**
 * client용 로그인 함수
 */
export const login = () => getGithubOauthUrl();

/**
 * client용 로그아웃 함수
 */
export const logout = () => signOut();

export function RenderLoginButton({
  render,
}: {
  render: (props: { label: string; onClick: () => void }) => JSX.Element;
}): JSX.Element {
  const t = useTranslations('Layout');

  return render({ label: t('login'), onClick: login });
}

export function RenderLogoutButton({
  render,
}: {
  render: (props: { label: string; onClick: () => void }) => JSX.Element;
}): JSX.Element {
  const t = useTranslations('Layout');

  return render({ label: t('logout'), onClick: logout });
}
