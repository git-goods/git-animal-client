import type { GetTotalIdentityUserCountResponse } from '@gitanimals/api';
import { getTotalIdentityUserCount } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

const getTotalIdentityUserCountOptions = () =>
  queryOptions<GetTotalIdentityUserCountResponse>({
    queryKey: ['identity', 'users', 'statistics', 'total'],
    queryFn: getTotalIdentityUserCount,
  });

export const identityQueryOptions = {
  getTotalIdentityUserCount: getTotalIdentityUserCountOptions,
};
