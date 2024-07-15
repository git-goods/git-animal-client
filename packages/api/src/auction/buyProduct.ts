// https://api.gitanimals.org/auctions/products/{product-id}

import z from 'zod';
import { HistoryProductSchema } from './schema';
import { safePost } from '../_instance/safe';

export type BuyProductRequest = {
  productId: string;
  token: string;
};

export type BuyProductResponse = z.infer<typeof HistoryProductSchema>;

export const buyProduct = async (request: BuyProductRequest): Promise<BuyProductResponse> => {
  return await safePost(HistoryProductSchema)(
    `/auctions/products/${request.productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
    },
  );
};
