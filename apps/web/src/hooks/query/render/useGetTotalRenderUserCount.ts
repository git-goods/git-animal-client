import type { GetTotalRenderUserCountResponse } from '@gitanimals/api';
import { getTotalRenderUserCount } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalRenderUserCount = (options?: UseQueryOptions<GetTotalRenderUserCountResponse>) =>
  useQuery<GetTotalRenderUserCountResponse>({
    queryKey: ['render', 'users', 'statistics', 'total'],
    queryFn: getTotalRenderUserCount,
    ...options,
  });
