'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { triggerSessionExpired } from '@/utils/sessionExpired';

export function SessionExpiredQueryWatcher() {
  // useSearchParams 를 구독해 마운트 이후 클라이언트 네비게이션으로 유입되는
  // `?session=expired` 도 감지한다. (기존 []-deps 는 최초 1회만 실행돼 놓침)
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('session') !== 'expired') return;

    const callbackUrl = searchParams.get('callbackUrl');
    triggerSessionExpired(callbackUrl);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('session');
    params.delete('callbackUrl');
    const query = params.toString();
    const nextUrl = window.location.pathname + (query ? `?${query}` : '');
    window.history.replaceState(null, '', nextUrl);
  }, [searchParams]);

  return null;
}
