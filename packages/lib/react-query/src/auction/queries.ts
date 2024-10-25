import { getProductsTypes } from '@gitanimals/api/src/auction';
import { queryOptions } from '@tanstack/react-query';

export const auctionQueries = {
  allKey: () => ['auction'],
  productTypesKey: () => [...auctionQueries.allKey(), 'product-types'],
  productTypesOptions: () =>
    queryOptions({
      queryKey: auctionQueries.productTypesKey(),
      queryFn: getProductsTypes,
    }),
};
