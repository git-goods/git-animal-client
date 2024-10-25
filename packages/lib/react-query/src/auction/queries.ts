import {
  getHistory,
  GetProductHistoriesRequest,
  getProducts,
  GetProductsRequest,
  getProductsTypes,
} from '@gitanimals/api/src/auction';
import { queryOptions } from '@tanstack/react-query';

export const auctionQueries = {
  allKey: () => ['auction'],
  // products
  productsKey: () => [...auctionQueries.allKey(), 'products'],
  productsOptions: (request?: GetProductsRequest) =>
    queryOptions({
      queryKey: [...auctionQueries.productsKey(), request],
      queryFn: () => getProducts(request),
    }),

  // product-types
  productTypesKey: () => [...auctionQueries.allKey(), 'product-types'],
  productTypesOptions: () =>
    queryOptions({
      queryKey: auctionQueries.productTypesKey(),
      queryFn: getProductsTypes,
    }),

  // history
  historyKey: () => [...auctionQueries.allKey(), 'history'],
  historyOptions: (request?: GetProductHistoriesRequest) =>
    queryOptions({
      queryKey: [...auctionQueries.historyKey(), request],
      queryFn: () => getHistory(request),
    }),
};
