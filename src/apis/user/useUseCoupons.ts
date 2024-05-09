import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { post } from '..';

interface PostCouponRequest {
  code: string;
  dynamic: string;
}

const postCoupon = async (request: PostCouponRequest) => post('/coupons', request);

export const useUseCoupon = (options?: UseMutationOptions<unknown, unknown, PostCouponRequest>) =>
  useMutation({
    mutationFn: postCoupon,
    ...options,
  });
