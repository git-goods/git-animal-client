'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@gitanimals/ui-tailwind';

import { login } from '@/components/AuthButton';
import { buildDesktopCallbackUrl, isValidDesktopRedirect } from '@/constants/desktopAuth';
import { useClientSession } from '@/hooks/clientAuth';

const pageRootClass =
  'flex min-h-screen flex-col items-center justify-center p-[24px] text-white bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)] mobile:p-[16px]';
const cardClass =
  'flex w-fit min-w-[520px] max-w-full flex-col items-center gap-[16px] rounded-[16px] bg-white-10 p-[40px] backdrop-blur-[7px] mobile:min-w-full mobile:bg-[rgba(255,255,255,0.08)] mobile:px-[16px] mobile:py-[24px]';

export default function DesktopAuthPage() {
  const params = useSearchParams();
  const redirectUri = params.get('redirect_uri');
  const state = params.get('state');
  const errorCode = params.get('error');
  const t = useTranslations('Auth');

  const { status, data } = useClientSession();

  const isValid = isValidDesktopRedirect(redirectUri) && !!state;

  useEffect(() => {
    if (!isValid) return;
    if (status === 'authenticated' && data?.user?.accessToken) {
      window.location.replace(buildDesktopCallbackUrl(redirectUri!, data.user.accessToken, state!));
    }
  }, [status, isValid, redirectUri, state, data?.user?.accessToken]);

  if (!isValid) {
    return (
      <div className={pageRootClass}>
        <div className={cardClass}>
          <h1 className="glyph28-bold text-white mobile:glyph24-bold">{t('desktopInvalidTitle')}</h1>
          <p className="glyph16-regular text-center text-white-75">{t('desktopInvalidDescription')}</p>
        </div>
      </div>
    );
  }

  const handleLogin = () => {
    login(`/auth/desktop?redirect_uri=${encodeURIComponent(redirectUri!)}&state=${encodeURIComponent(state!)}`);
  };

  return (
    <div className={pageRootClass}>
      <div className={cardClass}>
        <h1 className="glyph28-bold text-white mobile:glyph24-bold">{t('desktopTitle')}</h1>

        {errorCode && (
          <div className="w-full rounded-[8px] bg-[rgba(255,75,75,0.15)] px-[16px] py-[12px] text-center glyph14-regular text-white">
            {t('desktopErrorBanner')}
          </div>
        )}

        {status === 'loading' && <p className="glyph20-regular text-white-75">{t('desktopLoadingMessage')}</p>}

        {status === 'authenticated' && (
          <p className="glyph20-regular text-white-75">{t('desktopAuthenticatedMessage')}</p>
        )}

        {status === 'unauthenticated' && (
          <>
            <p className="whitespace-pre-line text-center glyph16-regular text-white-75">{t('desktopDescription')}</p>
            <Button variant="primary" size="m" onClick={handleLogin}>
              {t('desktopContinueButton')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
