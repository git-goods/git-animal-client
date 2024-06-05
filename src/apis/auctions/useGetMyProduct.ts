import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductSchema } from '@/schema/action';
import type { PaginationRequestSchema, PaginationSchema } from '@/schema/pagination';
import { convertCamelObjToSnake } from '@/utils/string';

import { get } from '..';

interface GetMyProductRequest extends PaginationRequestSchema {}

interface GetMyProductResponse {
  products: ProductSchema[];
  pagination: PaginationSchema;
}

export const getMyProductsQueryKey = (request?: GetMyProductRequest) => ['my', 'products', request].filter(Boolean);

const getMyProducts = async <T = GetMyProductResponse>(request?: GetMyProductRequest): Promise<T> =>
  get('/auctions/products/users', {
    params: request ? convertCamelObjToSnake(request) : undefined,
  });

/**
 * 토큰에 해당하는 유저가 올린 상품들을 조회합니다.
 */
export const useGetMyProducts = <T = GetMyProductResponse>(
  request?: GetMyProductRequest,
  option?: Omit<UseQueryOptions<T>, 'queryKey'>,
) => {
  return useQuery<T>({
    queryKey: getMyProductsQueryKey(request),
    queryFn: () => getMyProducts(request),
    ...option,
  });
};
