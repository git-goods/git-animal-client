'use client';

import { useEffect } from 'react';
import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { SESSION_STORAGE_KEY } from '@/constants/storage';
import { identifyUser, resetAnalyticsUser, setUserProperties, trackEvent } from '@/lib/analytics';
import { useClientSession } from '@/utils/clientAuth';

/**
 * 로그인한 사용자를 Mixpanel에 식별하고, 포인트를 사용자 속성으로 동기화한다.
 * - 세션 id가 잡히면 identify, 로그아웃하면 reset
 * - 유저 쿼리의 points가 바뀔 때마다 people.set으로 항상 동기화
 *   (옥션 구매 등으로 유저 쿼리가 invalidate되면 자동으로 갱신됨)
 */
export function useSyncAnalyticsUser() {
  const { data: session, status } = useClientSession();
  const userId = String(session?.user?.id ?? '');

  const { data: user } = useQuery({
    ...userQueries.userOptions(),
    enabled: Boolean(userId),
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
