import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductSchema } from '@/schema/action';
import type { PaginationRequestSchema, PaginationSchema } from '@/schema/pagination';
import { convertCamelObjToKebab } from '@/utils/string';

import { get } from '..';

interface GetProductsRequest extends PaginationRequestSchema {
  personaType?: string;
}

interface GetProductsResponse {
  products: ProductSchema[];
  pagination: PaginationSchema;
}

export const getProductsQueryKey = (request?: GetProductsRequest) => ['products', request].filter(Boolean);

const getProducts = async <T = GetProductsResponse>(request?: GetProductsRequest): Promise<T> =>
  get('/auctions/products', {
    params: request ? convertCamelObjToKebab(request) : undefined,
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
