import type { GetTotalIdentityUserCountResponse } from '@gitanimals/api';
import { getTotalIdentityUserCount } from '@gitanimals/api';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetTotalIdentityUserCount = (options?: UseSuspenseQueryOptions<GetTotalIdentityUserCountResponse>) =>
  useSuspenseQuery<GetTotalIdentityUserCountResponse>({
    queryKey: ['identity', 'users', 'statistics', 'total'],
    queryFn: getTotalIdentityUserCount,
    ...options,
  });
