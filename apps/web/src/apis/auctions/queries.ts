import type { GetTotalProductCountResponse } from '@gitanimals/api';
import { getTotalProductCount } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

const getTotalProductCountOptions = () =>
  queryOptions<GetTotalProductCountResponse>({
    queryKey: ['product', 'auction', 'statistics', 'total'],
    queryFn: getTotalProductCount,
  });

export const auctionQueryOptions = {
  getTotalProductCount: getTotalProductCountOptions,
};
