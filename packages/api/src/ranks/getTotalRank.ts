import { z } from 'zod';
import { safeRenderGet } from '../_instance/safe';

const GetTotalRankRequestSchema = z.object({
  type: z.enum(['WEEKLY_USER_CONTRIBUTIONS', 'WEEKLY_GUILD_CONTRIBUTIONS']),
});

const GetTotalRankResponseSchema = z.object({
  count: z.number(),
});

export type GetTotalRankRequest = z.infer<typeof GetTotalRankRequestSchema>;
export type GetTotalRankResponse = z.infer<typeof GetTotalRankResponseSchema>;

export const getTotalRank = async (request: GetTotalRankRequest) => {
  return await safeRenderGet(GetTotalRankResponseSchema)(`/ranks/total?type=${request.type}`);
};
