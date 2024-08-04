import type { GetTotalProductCountResponse } from '@gitanimals/api';
import { getTotalProductCount } from '@gitanimals/api';
import { useSuspenseQuery, type UseSuspenseQueryOptions } from '@tanstack/react-query';

export const useGetTotalProductCount = (options?: UseSuspenseQueryOptions<GetTotalProductCountResponse>) =>
  useSuspenseQuery<GetTotalProductCountResponse>({
    queryKey: ['product', 'auction', 'statistics', 'total'],
    queryFn: getTotalProductCount,
    initialData: { count: 0 },
    ...options,
  });
