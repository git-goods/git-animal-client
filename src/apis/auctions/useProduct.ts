import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { PersonaSchema } from '@/schema/action';

import { del, patch } from '..';

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
