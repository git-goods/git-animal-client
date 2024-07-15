import { getToken } from '@/utils/token';
import { BuyProductRequest, BuyProductResponse, buyProduct, buyProductWithToken } from '@gitanimals/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

// export const useBuyProduct = (options?: UseMutationOptions<BuyProductResponse, unknown, string>) =>
//     useMutation<BuyProductResponse, unknown, string>({
//       mutationFn: buyProduct,
//       ...options,
//     });

export const useBuyProduct = (options?: UseMutationOptions<BuyProductResponse, unknown, BuyProductRequest>) => {
  return useMutation<BuyProductResponse, unknown, BuyProductRequest>({
    mutationFn: (request) => {
      const token = getToken();
      if (!token) throw new Error('Token not found');

      return buyProductWithToken({ ...request, token });
    },
    ...options,
  });
};
