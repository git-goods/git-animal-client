import { getUsedCoupons } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const couponQueries = {
  allKey: () => ['coupon'],
  usedCouponsKey: () => [...couponQueries.allKey(), 'used'],
  usedCouponsOptions: () =>
    queryOptions({
      queryKey: couponQueries.usedCouponsKey(),
      queryFn: () => getUsedCoupons(),
    }),
};
