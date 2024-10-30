import z from 'zod';
import { HistoryProductSchema } from './schema';
import { safePost } from '../_instance/safe';

export type BuyProductRequest = {
  productId: string;
};

export type BuyProductResponse = z.infer<typeof HistoryProductSchema>;

export const buyProduct = async (request: BuyProductRequest): Promise<BuyProductResponse> => {
  return await safePost(HistoryProductSchema)(`/auctions/products/${request.productId}`);
};

export const buyProductWithToken = async (
  request: BuyProductRequest & { token: string },
): Promise<BuyProductResponse> => {
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
