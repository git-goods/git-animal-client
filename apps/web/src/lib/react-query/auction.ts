import { getProductsTypes } from '@gitanimals/api/src/auction';
import { queryOptions } from '@tanstack/react-query';

export const auctionQueryKeys = {
  all: () => ['auction'],
  productTypes: () => [...auctionQueryKeys.all(), 'product-types'],
};

export const useProductTypesQueryOptions = queryOptions({
  queryKey: auctionQueryKeys.productTypes(),
  queryFn: getProductsTypes,
});
