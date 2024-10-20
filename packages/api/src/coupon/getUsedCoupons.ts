import z from 'zod';
import { safeGet } from '../_instance/safe';

const CouponSchema = z.object({
  code: z.string(),
  id: z.string(),
  usedAt: z.string(),
  userId: z.string(),
});

const GetUsedCouponsSchema = z.object({
  coupons: z.array(CouponSchema),
});

export const getUsedCoupons = () => {
  return safeGet(GetUsedCouponsSchema)(`/coupons/users`);
};
