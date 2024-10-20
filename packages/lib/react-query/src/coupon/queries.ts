import { getUsedCoupons } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const couponQueries = {
  getUserCouponsQueryKey: ['coupon', 'used'],
  getUsedCoupons: () =>
    queryOptions({
      queryKey: couponQueries.getUserCouponsQueryKey,
      queryFn: () => getUsedCoupons(),
    }),
};
