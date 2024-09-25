'use client';

import type { ComponentProps, JSX } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-panda';

import { getGithubOauthUrl } from '@/apis/auth/getGithubOauth';

/**
 * client용 로그인 함수
 */
export const login = () => getGithubOauthUrl();

/**
 * client용 로그아웃 함수
 */
export const logout = () => signOut();

/**
 * 로그인 버튼 렌더링
 * - render props 패턴 사용
 * - 렌더링할 dom은 props로 전달받고, 로직만을 담당
 */
export function RenderLoginButton({
  render,
}: {
  render: (props: { label: string; onClick: () => void }) => JSX.Element;
}): JSX.Element {
  const t = useTranslations('Layout');

  return render({ label: t('login'), onClick: login });
}

/**
 * 로그아웃 버튼 렌더링
 * - render props 패턴 사용
 * - 렌더링할 dom은 props로 전달받고, 로직만을 담당
 */
export function RenderLogoutButton({
  render,
}: {
  render: (props: { label: string; onClick: () => void }) => JSX.Element;
}): JSX.Element {
  const t = useTranslations('Layout');

  return render({ label: t('logout'), onClick: logout });
}

/**
 * 로그인 버튼
 * - design system 상의 Button 컴포넌트로 렌더링
 */
export function LoginButton(props: Omit<ComponentProps<typeof Button>, 'children' | 'onClick'>) {
  return (
    <RenderLoginButton
      render={({ label, onClick }) => (
        <Button onClick={onClick} {...props}>
          {label}
        </Button>
      )}
    />
  );
}

/**
 * 로그아웃 버튼
 * - design system 상의 Button 컴포넌트로 렌더링
 */
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
