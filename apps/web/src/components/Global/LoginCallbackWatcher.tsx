'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { LOCAL_STORAGE_KEY } from '@/constants/storage';

// 미들웨어가 붙여 보낸 ?callbackUrl 을 저장해 두면 login() 이 로그인 후 그 경로로 돌려보낸다.
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
