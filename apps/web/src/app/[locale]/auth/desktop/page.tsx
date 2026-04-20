'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { css } from '_panda/css';

import { login } from '@/components/AuthButton';
import { buildDesktopCallbackUrl, isValidDesktopRedirect } from '@/constants/desktopAuth';
import { useClientSession } from '@/utils/clientAuth';

export default function DesktopAuthPage() {
  const params = useSearchParams();
  const redirectUri = params.get('redirect_uri');
  const state = params.get('state');

  const { status, data } = useClientSession();

  const isValid = isValidDesktopRedirect(redirectUri) && !!state;

  useEffect(() => {
    if (!isValid) return;

    if (status === 'authenticated' && data?.user?.accessToken) {
      window.location.replace(buildDesktopCallbackUrl(redirectUri!, data.user.accessToken, state!));
    } else if (status === 'unauthenticated') {
      login(
        `/auth/desktop?redirect_uri=${encodeURIComponent(redirectUri!)}&state=${encodeURIComponent(state!)}`,
      );
    }
  }, [status, isValid, redirectUri, state, data?.user?.accessToken]);

  if (!isValid) {
    return (
      <div className={pageRootCss}>
        <div className={cardCss}>
          <h1 className={titleCss}>잘못된 요청</h1>
          <p className={descCss}>
            redirect_uri가 허용 범위를 벗어났거나 필수 파라미터가 누락되었습니다.
          </p>
        </div>
      </div>
    );
  }

  const message =
    status === 'authenticated' ? '데스크톱 앱으로 이동합니다…' : '로그인으로 이동합니다…';

  return (
    <div className={pageRootCss}>
      <div className={cardCss}>
        <p className={loadingTextCss}>{message}</p>
      </div>
    </div>
  );
}

const pageRootCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '24px',
  bg: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',
  color: 'white',
  _mobile: {
    padding: '16px',
  },
});

const cardCss = css({
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(7px)',
  padding: '40px',
  width: 'fit-content',
  minWidth: '520px',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  _mobile: {
    minWidth: '100%',
    padding: '24px 16px',
    background: 'rgba(255, 255, 255, 0.08)',
  },
});

const titleCss = css({
  textStyle: 'glyph28.bold',
  color: 'white',
  _mobile: { textStyle: 'glyph24.bold' },
});

const loadingTextCss = css({
  textStyle: 'glyph20.regular',
  color: 'white.white_70',
});

const descCss = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_80',
  textAlign: 'center',
});
