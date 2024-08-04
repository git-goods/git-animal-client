import type { GetTotalRenderUserCountResponse } from '@gitanimals/api';
import { getTotalRenderUserCount } from '@gitanimals/api';
import type { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetTotalRenderUserCount = (options?: UseSuspenseQueryOptions<GetTotalRenderUserCountResponse>) =>
  useSuspenseQuery<GetTotalRenderUserCountResponse>({
    queryKey: ['render', 'users', 'statistics', 'total'],
    queryFn: getTotalRenderUserCount,
    ...options,
  });
