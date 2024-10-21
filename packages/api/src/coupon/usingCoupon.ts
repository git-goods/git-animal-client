import z from 'zod';
import { safePost } from '../_instance/safe';

const UsingCouponResultSchema = z.object({
  result: z.string(),
});

interface UsingCouponRequest {
  code: string;
  dynamic?: string;
}

export const usingCoupon = (request: UsingCouponRequest) => {
  // NOTE: 개발 환경에서 사용하기 위함 ㅇㅇ..
  // return Promise.resolve({ result: 'GHOST' });

  return safePost(UsingCouponResultSchema)(`/coupons`, {
    ...request,
  });
};
