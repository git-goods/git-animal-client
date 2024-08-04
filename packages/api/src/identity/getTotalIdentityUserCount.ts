import z from 'zod';
import { safeGet } from '../_instance/safe';

const GetTotalIdentityUserCountResponseSchema = z.object({
  userCount: z.string(),
});

export type GetTotalIdentityUserCountResponse = z.infer<typeof GetTotalIdentityUserCountResponseSchema>;

export const getTotalIdentityUserCount = (): Promise<GetTotalIdentityUserCountResponse> => {
  return safeGet(GetTotalIdentityUserCountResponseSchema)('/users/statistics/total');
};
