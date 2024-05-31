import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductSchema } from '@/schema/action';
import { convertCamelObjToSnake } from '@/utils/string';

import { get } from '..';

interface GetProductsRequest {
  lastId?: string;
  personaType?: string;
  count?: number;
}

interface GetProductsResponse {
  products: ProductSchema[];
}

export const getProductsQueryKey = (request?: GetProductsRequest) => ['products', request].filter(Boolean);

const getProducts = async <T = GetProductsResponse>(request?: GetProductsRequest): Promise<T> =>
  get('/auctions/products', {
    params: request ? convertCamelObjToSnake(request) : undefined,
  });

export const useGetProducts = <T = GetProductsResponse>(
  request?: GetProductsRequest,
  option?: Omit<UseQueryOptions<T>, 'queryKey'>,
) => {
  return useQuery<T>({
    queryKey: getProductsQueryKey(request),
    queryFn: () => getProducts(request),
    ...option,
  });
};
