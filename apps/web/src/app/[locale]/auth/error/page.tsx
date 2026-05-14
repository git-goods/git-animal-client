'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Button } from '@gitanimals/ui-panda';

import { login } from '@/components/AuthButton';
import { LOCAL_STORAGE_KEY } from '@/constants/storage';

const DESKTOP_CALLBACK_HINTS = ['/auth/desktop', 'redirect_uri='];

const isDesktopCallback = (value: string | null): value is string => {
  if (!value) return false;
  return DESKTOP_CALLBACK_HINTS.some((hint) => value.includes(hint));
};

export default function AuthErrorPage() {
  const params = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Auth');

  const errorCode = params.get('error');
  const [savedCallbackUrl, setSavedCallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    setSavedCallbackUrl(localStorage.getItem(LOCAL_STORAGE_KEY.callbackUrl));
  }, []);

  const isDesktopFlow = isDesktopCallback(savedCallbackUrl);

  const description = (() => {
    switch (errorCode) {
      case 'AccessDenied':
        return t('errorDescriptionAccessDenied');
      case 'CredentialsSignin':
        return t('errorDescriptionCredentials');
      default:
        return t('errorDescriptionDefault');
    }
  })();

  const handleRetry = () => {
    if (isDesktopFlow && savedCallbackUrl) {
      router.replace(savedCallbackUrl);
      return;
    }
    login('/mypage');
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  return (
    <main className={pageRootCss}>
      <section className={cardCss}>
        <h1 className={titleCss}>{t('errorTitle')}</h1>
        <p className={descCss}>{description}</p>
        {errorCode && <p className={errorCodeCss}>code: {errorCode}</p>}
        <div className={buttonRowCss}>
          <Button variant="primary" size="m" onClick={handleRetry}>
            {isDesktopFlow ? t('errorRetryDesktop') : t('errorRetryDefault')}
          </Button>
          <Button variant="secondary" size="m" onClick={handleGoHome}>
            {t('errorGoHome')}
          </Button>
        </div>
      </section>
    </main>
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
  _mobile: { padding: '16px' },
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

const descCss = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_80',
  textAlign: 'center',
  whiteSpace: 'pre-line',
});

const errorCodeCss = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_60',
});

const buttonRowCss = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: '8px',
  justifyContent: 'center',
});
