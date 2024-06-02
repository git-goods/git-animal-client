import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductHistorySchema } from '@/schema/action';
import type { PaginationRequestSchema } from '@/schema/pagination';

import { get } from '..';

interface GetHistoryRequest extends PaginationRequestSchema {
  personaType?: string;
}

interface GetHistoryResponse {
  products: ProductHistorySchema[];
}

const getHistory = async <T = GetHistoryResponse>(request?: GetHistoryRequest): Promise<T> =>
  get('/auctions/products/histories', { params: request });

export const getHistoryQueryKey = (request?: GetHistoryRequest) => ['history', request];

export const useGetHistory = <T = GetHistoryResponse>(
  request?: GetHistoryRequest,
  option?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<T>({
    queryKey: getHistoryQueryKey(request),
    queryFn: () => getHistory(request),
    ...option,
  });
};
