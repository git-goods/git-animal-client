import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductSchema, ProductType } from '@/schema/action';
import { useUser } from '@/store/user';
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

export const getProductsQueryKey = (request?: GetProductsRequest) => ['products', request];

const getProducts = async (request?: GetProductsRequest): Promise<GetProductsResponse> =>
  get('/auctions/products', {
    params: request ? convertCamelObjToSnake(request) : undefined,
  });

export const useGetProducts = (request?: GetProductsRequest, option?: UseQueryOptions<GetProductsResponse>) => {
  return useQuery<GetProductsResponse>({
    queryKey: getProductsQueryKey(request),
    queryFn: () => getProducts(request),
    ...option,
  });
};

interface GetProductForProductListResponse {
  products: ProductType[];
}

export const useGetProductForProductList = (
  request?: GetProductsRequest,
  option?: UseQueryOptions<GetProductForProductListResponse>,
) => {
  const myId = useUser()?.id;

  return useQuery<GetProductForProductListResponse>({
    queryKey: getProductsQueryKey(request),
    queryFn: () => getProducts(request),
    ...option,
    enabled: Boolean(myId),
    select: (data) => {
      const products = data?.products || [];
      return {
        products: products.map((product) => {
          if (product.sellerId === myId) {
            return { ...product, paymentState: 'MY_SELLING' };
          }
          return product;
        }),
      };
    },
  });
};
