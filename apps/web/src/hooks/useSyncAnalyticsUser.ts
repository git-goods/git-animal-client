'use client';

import { useEffect } from 'react';
import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { SESSION_STORAGE_KEY } from '@/constants/storage';
import { identifyUser, resetAnalyticsUser, setUserProperties, trackEvent } from '@/lib/analytics';
import { useClientSession } from '@/hooks/clientAuth';

export function useSyncAnalyticsUser() {
  const { data: session, status } = useClientSession();
  const userId = String(session?.user?.id ?? '');

  const { data: user } = useQuery({
    ...userQueries.userOptions(),
    enabled: Boolean(userId),
    // layout 에서 도는 훅이라, throw 하면 error.tsx 를 지나쳐 앱 전체가 크래시한다.
    throwOnError: false,
  });

  useEffect(() => {
    if (status === 'loading') return;

    if (userId) {
      identifyUser(userId);

      // LoginButton에서 set한 "방금 로그인함" 플래그가 있으면 로그인 직후 1회만 complete_login 발사
      if (sessionStorage.getItem(SESSION_STORAGE_KEY.justLoggedIn)) {
        trackEvent('complete_login');
        sessionStorage.removeItem(SESSION_STORAGE_KEY.justLoggedIn);
      }
    } else {
      resetAnalyticsUser();
    }
  }, [status, userId]);

  useEffect(() => {
    if (!user) return;
    setUserProperties({ points: Number(user.points) });
  }, [user?.points]);
}
