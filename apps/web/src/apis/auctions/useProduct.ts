import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { PersonaSchema, ProductHistorySchema } from '@/schema/action';

import { del, patch, post } from '..';

interface DeleteProductResponse {
  id: string;
}

const deleteProduct = async (productId: string): Promise<DeleteProductResponse> =>
  del(`/auctions/products/${productId}`);

export const useDeleteProduct = (options?: UseMutationOptions<DeleteProductResponse, unknown, string>) =>
  useMutation<DeleteProductResponse, unknown, string>({
    mutationFn: deleteProduct,
    ...options,
  });

// https://api.gitanimals.org/auctions/products

interface ChangeProductPriceRequest {
  price: string;
  id: string;
}

interface ChangeProductPriceResponse {
  sellerId: string;
  persona: PersonaSchema;
  price: string;
  paymentState: string;
}

const changeProductPrice = async (request: ChangeProductPriceRequest): Promise<ChangeProductPriceResponse> =>
  patch(`/auctions/products`, request);

export const useChangeProductPrice = (
  options?: UseMutationOptions<ChangeProductPriceResponse, unknown, ChangeProductPriceRequest>,
) =>
  useMutation<ChangeProductPriceResponse, unknown, ChangeProductPriceRequest>({
    mutationFn: changeProductPrice,
    ...options,
  });

type BuyProductResponse = ProductHistorySchema;

const buyProduct = async (productId: string): Promise<BuyProductResponse> => post(`/auctions/products/${productId}`);

export const useBuyProduct = (options?: UseMutationOptions<BuyProductResponse, unknown, string>) =>
  useMutation<BuyProductResponse, unknown, string>({
    mutationFn: buyProduct,
    ...options,
  });
