import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { ApiErrorScheme } from '@/shared/exceptions/type';
import type { ProductHistorySchema } from '@/shared/schema/action';

import { post } from '@/shared/api/legacyClient';

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
