import z from 'zod';
import { safeGet } from '../_instance/safe';

const GetUsedCouponsResponseSchema = z.object({
  coupons: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      code: z.string(),
      usedAt: z.string(),
    }),
  ),
});

export type GetUsedCouponsResponse = z.infer<typeof GetUsedCouponsResponseSchema>;

export const getUsedCoupons = (): Promise<GetUsedCouponsResponse> => {
  return safeGet(GetUsedCouponsResponseSchema)('/coupons/users');
};

export const getUsedCouponsByToken = (token: string): Promise<GetUsedCouponsResponse> => {
  return safeGet(GetUsedCouponsResponseSchema)('/coupons/users', {
    headers: {
      Authorization: token,
    },
  });
};
