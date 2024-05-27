import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Product } from '@/schema/action';
import { useUser } from '@/store/user';
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
export const getProductsQueryKey = (request?: GetProductsRequest) => ['products', request];

export const getProducts = async (request?: GetProductsRequest): Promise<GetProductsResponse> =>
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

export const useGetProductForProductList = (
  request?: GetProductsRequest,
  option?: UseQueryOptions<GetProductsResponse>,
) => {
  const myId = useUser()?.id;

  return useQuery<GetProductsResponse>({
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
