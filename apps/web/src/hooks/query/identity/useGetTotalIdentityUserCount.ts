import type { GetTotalIdentityUserCountResponse } from '@gitanimals/api';
import { getTotalIdentityUserCount } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalIdentityUserCount = (options?: UseQueryOptions<GetTotalIdentityUserCountResponse>) =>
  useQuery<GetTotalIdentityUserCountResponse>({
    queryKey: ['identity', 'users', 'statistics', 'total'],
    queryFn: getTotalIdentityUserCount,
    ...options,
  });
