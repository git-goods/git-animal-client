import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const GetTotalRenderUserCountResponseSchema = z.object({
  userCount: z.number(),
});

export type GetTotalRenderUserCountResponse = z.infer<typeof GetTotalRenderUserCountResponseSchema>;

export const getTotalRenderUserCount = (): Promise<GetTotalRenderUserCountResponse> => {
  return safeRenderGet(GetTotalRenderUserCountResponseSchema)('/users/statistics/total');
};
