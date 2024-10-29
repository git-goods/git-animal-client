import { BuyBackgroundRequest, BuyBackgroundResponse, buyBackground } from '@gitanimals/api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useBuyBackground = (
  options?: UseMutationOptions<BuyBackgroundResponse, unknown, BuyBackgroundRequest>,
) => {
  return useMutation({
    mutationFn: buyBackground,
    ...options,
  });
};
