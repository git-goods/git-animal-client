'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-tailwind';

import { login } from '@/components/AuthButton';
import { LOCAL_STORAGE_KEY } from '@/constants/storage';

const DESKTOP_CALLBACK_HINTS = ['/auth/desktop', 'redirect_uri='];

const isDesktopCallback = (value: string | null): value is string => {
  if (!value) return false;
  return DESKTOP_CALLBACK_HINTS.some((hint) => value.includes(hint));
};

const pageRootClass =
  'flex min-h-screen flex-col items-center justify-center p-[24px] text-white bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)] mobile:p-[16px]';
const cardClass =
  'flex w-fit min-w-[520px] max-w-full flex-col items-center gap-[16px] rounded-[16px] bg-white-10 p-[40px] backdrop-blur-[7px] mobile:min-w-full mobile:bg-[rgba(255,255,255,0.08)] mobile:px-[16px] mobile:py-[24px]';

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
    <main className={pageRootClass}>
      <section className={cardClass}>
        <h1 className="glyph28-bold text-white mobile:glyph24-bold">{t('errorTitle')}</h1>
        <p className="whitespace-pre-line text-center glyph16-regular text-white-75">{description}</p>
        {errorCode && <p className="glyph14-regular text-white-50">code: {errorCode}</p>}
        <div className="mt-[8px] flex flex-wrap justify-center gap-[12px]">
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
