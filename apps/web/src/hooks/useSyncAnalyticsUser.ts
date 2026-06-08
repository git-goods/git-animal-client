'use client';

import { useEffect } from 'react';
import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { identifyUser, resetAnalyticsUser, setUserProperties } from '@/lib/analytics';
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
    } else {
      resetAnalyticsUser();
    }
  }, [status, userId]);

  useEffect(() => {
    if (!user) return;
    setUserProperties({ points: Number(user.points) });
  }, [user?.points]);
}
