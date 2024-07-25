import type { GetTotalProductCountResponse } from '@gitanimals/api';
import { getTotalProductCount } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetTotalProductCount = (options?: UseQueryOptions<GetTotalProductCountResponse>) =>
  useQuery<GetTotalProductCountResponse>({
    queryKey: ['product', 'auction', 'statistics', 'total'],
    queryFn: getTotalProductCount,
    initialData: { count: 0 },
    ...options,
  });
