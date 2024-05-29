import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductSchema, ProductType } from '@/schema/action';
import type { PaginationSchema } from '@/schema/pagination';
import { convertCamelObjToSnake } from '@/utils/string';

import { get } from '..';

interface GetMyProductRequest extends PaginationSchema {}

interface GetMyProductResponse {
  products: ProductSchema[];
}

export const getMyProductsQueryKey = (request?: GetMyProductRequest) => ['my', 'products', request];

const getMyProducts = async (request?: GetMyProductRequest): Promise<GetMyProductResponse> =>
  get('/auctions/products/users', {
    params: request ? convertCamelObjToSnake(request) : undefined,
  });

/**
 * 토큰에 해당하는 유저가 올린 상품들을 조회합니다.
 */
export const useGetMyProducts = (
  request?: GetMyProductRequest,
  option?: Omit<UseQueryOptions<GetMyProductResponse>, 'queryKey'>,
) => {
  return useQuery<GetMyProductResponse>({
    queryKey: getMyProductsQueryKey(request),
    queryFn: () => getMyProducts(request),
    ...option,
  });
};

interface GetMyProductForSellResponse {
  products: ProductType[];
}

/**
 * 나의 상품을 조회합니다.
 */
export const useGetMyProductsForSellList = (
  request?: GetMyProductRequest,
  option?: Omit<UseQueryOptions<GetMyProductForSellResponse>, 'queryKey' | 'select'>,
) => {
  return useQuery<GetMyProductForSellResponse>({
    queryKey: getMyProductsQueryKey(request),
    queryFn: () => getMyProducts(request),
    ...option,
    select: (data) => ({
      ...data,
      products: data.products.map((product) => {
        return { ...product, paymentState: 'EDIT' };
      }),
    }),
  });
};
