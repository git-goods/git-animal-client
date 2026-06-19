'use client';

import { useEffect } from 'react';

import { triggerSessionExpired } from '@/utils/sessionExpired';

export function SessionExpiredQueryWatcher() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('session') !== 'expired') return;

    const callbackUrl = params.get('callbackUrl');
    triggerSessionExpired(callbackUrl);

    params.delete('session');
    params.delete('callbackUrl');
    const query = params.toString();
    const nextUrl = window.location.pathname + (query ? `?${query}` : '');
    window.history.replaceState(null, '', nextUrl);
  }, []);

  return null;
}
