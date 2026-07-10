import {
  getHistory,
  getMyProducts,
  GetMyProductsRequest,
  GetProductHistoriesRequest,
  getProducts,
  GetProductsRequest,
  getProductsTypes,
  getTotalProductCount,
  GetTotalProductCountResponse,
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

  // user
  myProductsKey: () => [...auctionQueries.allKey(), 'my-products'],
  myProductsOptions: (request?: GetMyProductsRequest) =>
    queryOptions({
      queryKey: [...auctionQueries.myProductsKey(), request],
      queryFn: () => getMyProducts(request),
    }),

  // statistics — intentionally NOT derived from allKey(): the total-count widget
  // must stay decoupled from trade invalidations (buy/sell/delete).
  totalProductCountKey: () => ['product', 'auction', 'statistics', 'total'],
  totalProductCountOptions: () =>
    queryOptions<GetTotalProductCountResponse>({
      queryKey: auctionQueries.totalProductCountKey(),
      queryFn: getTotalProductCount,
    }),
};
