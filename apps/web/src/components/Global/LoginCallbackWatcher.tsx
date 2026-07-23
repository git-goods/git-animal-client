'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';

// 보호 라우트에서 미들웨어가 홈으로 되돌릴 때 실어 보낸 `?callbackUrl` 을 캡처해
// localStorage 에 저장한다. 사용자가 로그인하면 login()/LoginButton 이 이 값을 읽어
// 원래 목적지로 자동 복귀시킨다. (useSearchParams 구독으로 클라 네비게이션 유입도 감지)
export function LoginCallbackWatcher() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (!callbackUrl) return;

    // open-redirect 방지: 외부 절대 URL(`//`, `https://…`)은 무시하고 앱 내부 경로만 허용.
    const isInternalPath = callbackUrl.startsWith('/') && !callbackUrl.startsWith('//');
    if (isInternalPath) {
      localStorage.setItem(LOCAL_STORAGE_KEY.callbackUrl, callbackUrl);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('callbackUrl');
    const query = params.toString();
    window.history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : ''));
  }, [searchParams]);

  return null;
}
