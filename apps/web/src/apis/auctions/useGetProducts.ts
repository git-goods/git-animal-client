import type { GetProductsRequest, GetProductsResponse } from '@gitanimals/api';
import { getProducts } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const getProductsQueryKey = (request?: GetProductsRequest) => ['products', request].filter(Boolean);

export const useGetProducts = (
  request?: GetProductsRequest,
  option?: Omit<UseQueryOptions<GetProductsResponse>, 'queryKey'>,
) => {
  return useQuery({
    queryKey: getProductsQueryKey(request),
    queryFn: () => getProducts(request),
    ...option,
  });
};
