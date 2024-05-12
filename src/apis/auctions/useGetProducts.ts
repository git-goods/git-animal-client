import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Product } from '@/schema/action';
import { convertCamelObjToSnake } from '@/utils/string';

import { get } from '..';

interface GetProductsRequest {
  lastId?: string;
  personaType?: string;
  count?: number;
}

interface GetProductsResponse {
  products: Product[];
}

export const getProducts = async (request?: GetProductsRequest): Promise<GetProductsResponse> =>
  get('/auctions/products', {
    params: request ? convertCamelObjToSnake(request) : undefined,
  });

export const useGetProducts = (request?: GetProductsRequest, option?: UseQueryOptions<GetProductsResponse>) => {
  return useQuery<GetProductsResponse>({
    queryKey: ['products', request],
    queryFn: () => getProducts(request),
    ...option,
  });
};
