import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductHistorySchema } from '@/schema/action';

import { get } from '..';

interface GetHistoryRequest {
  lastId?: string;
  personaType?: string;
  count?: number;
}

interface GetHistoryResponse {
  products: ProductHistorySchema[];
}

const getHistory = async (request?: GetHistoryRequest): Promise<GetHistoryResponse> =>
  get('/auctions/products/histories', { params: request });

export const useGetHistory = (request?: GetHistoryRequest, option?: UseQueryOptions<GetHistoryResponse>) => {
  return useQuery<GetHistoryResponse>({
    queryKey: ['history', request],
    queryFn: () => getHistory(request),
    ...option,
  });
};
