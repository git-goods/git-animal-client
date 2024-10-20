import z from 'zod';
import { safePost } from '../_instance/safe';

const UseCouponResultSchema = z.object({
  result: z.string(),
});

interface UseCouponRequest {
  code: string;
  dynamic?: string;
}

export const useCoupon = (request: UseCouponRequest) => {
  return safePost(UseCouponResultSchema)(`/coupons`, {
    body: request,
  });
};
