'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { login } from '@/components/AuthButton';
import { buildDesktopCallbackUrl, isValidDesktopRedirect } from '@/constants/desktopAuth';
import { useClientSession } from '@/utils/clientAuth';

const pageRootClass =
  'flex min-h-screen flex-col items-center justify-center p-[24px] text-white bg-[linear-gradient(180deg,#000_0%,#004875_38.51%,#005B93_52.46%,#006FB3_73.8%,#0187DB_100%)] mobile:p-[16px]';
const cardClass =
  'flex w-fit min-w-[520px] max-w-full flex-col items-center gap-[16px] rounded-[16px] bg-white-10 p-[40px] backdrop-blur-[7px] mobile:min-w-full mobile:bg-[rgba(255,255,255,0.08)] mobile:px-[16px] mobile:py-[24px]';

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
      <div className={pageRootClass}>
        <div className={cardClass}>
          <h1 className="glyph28-bold text-white mobile:glyph24-bold">잘못된 요청</h1>
          <p className="glyph16-regular text-center text-white">
            redirect_uri가 허용 범위를 벗어났거나 필수 파라미터가 누락되었습니다.
          </p>
        </div>
      </div>
    );
  }

  const message =
    status === 'authenticated' ? '데스크톱 앱으로 이동합니다…' : '로그인으로 이동합니다…';

  return (
    <div className={pageRootClass}>
      <div className={cardClass}>
        <p className="glyph20-regular text-white">{message}</p>
      </div>
    </div>
  );
}
