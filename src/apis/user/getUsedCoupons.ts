// /coupons/users;

import { get } from '..';

// {
//     "id": "987654321",
//     "userId": "user789",
//     "code": "ABC123",
//     "usedAt": "2024-05-06T15:45:30Z"
//   }

interface Coupons {
  id: string;
  userId: string;
  code: string;
  usedAt: string;
}

type GetUsedCouponsResponse = {
  coupons: Coupons[];
};

export const getUsedCouponsByToken = async (token: string) =>
  get<GetUsedCouponsResponse>('/coupons/users', {
    headers: {
      Authorization: token,
    },
  });

export const checkUsedCouponsByToken = async (token: string): Promise<boolean> => {
  const data = await getUsedCouponsByToken(token);

  if (data.coupons.length > 0) {
    return true;
  }
  return false;
};
