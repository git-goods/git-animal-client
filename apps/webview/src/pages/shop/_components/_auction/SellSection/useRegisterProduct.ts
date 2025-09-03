import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { ProductHistorySchema } from '@/schema/action';
import { post } from '@gitanimals/api/src/_instance';

interface ApiErrorScheme {
  message: string;
}

interface RegisterProductRequest {
  personaId: string;
  price: number;
}

type RegisterProductResponse = ProductHistorySchema;

const registerProduct = async (request: RegisterProductRequest): Promise<RegisterProductResponse> =>
  post('/auctions/products', request);

export const useRegisterProduct = (
  options?: UseMutationOptions<RegisterProductResponse, ApiErrorScheme, RegisterProductRequest>,
) =>
  useMutation({
    ...options,
    mutationFn: registerProduct,
  });
