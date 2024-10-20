import { useMutation } from '@tanstack/react-query';
import { usingCoupon } from '@gitanimals/api';

type UsingCouponRequest = Parameters<typeof usingCoupon>[0];

export const useUsingCoupon = () => {
  return useMutation({ mutationFn: (request: UsingCouponRequest) => usingCoupon(request) });
};
