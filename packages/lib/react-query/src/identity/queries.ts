import { getTotalIdentityUserCount, GetTotalIdentityUserCountResponse } from '@gitanimals/api/src/identity';
import { queryOptions } from '@tanstack/react-query';

export const identityQueries = {
  totalUserCountKey: () => ['identity', 'users', 'statistics', 'total'],
  totalUserCountOptions: () =>
    queryOptions<GetTotalIdentityUserCountResponse>({
      queryKey: identityQueries.totalUserCountKey(),
      queryFn: getTotalIdentityUserCount,
    }),
};
