import { api } from '.';

/**
 * POST /coupons
 * Authorization: {token}
 * @param data - { code: string, dynamic: string }
 * @returns { PostCouponsResponse }
 */
interface PostCouponsRequest {
  code: string;
  dynamic: string;
}

interface PostCouponsResponse {}

export const postCoupons = (data: PostCouponsRequest) => api.post<PostCouponsResponse>('/coupons', data);
