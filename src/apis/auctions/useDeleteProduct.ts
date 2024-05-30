import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { del } from '..';

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
