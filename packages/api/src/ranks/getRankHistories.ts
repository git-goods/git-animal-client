import z from 'zod';
import { renderGet } from '../_instance';
import { safeRenderGet } from '../_instance/safe';

const WinnerSchema = z.object({
  id: z.string(),
  rank: z.number(),
  prize: z.number(),
  name: z.string(),
  rankType: z.enum(['WEEKLY_GUILD_CONTRIBUTIONS', 'WEEKLY_USER_CONTRIBUTIONS']),
});

const GetRankHistoriesRequestSchema = z.object({
  rankType: z.enum(['WEEKLY_GUILD_CONTRIBUTIONS', 'WEEKLY_USER_CONTRIBUTIONS']),
});

const GetRankHistoriesResponseSchema = z.object({
  winner: z.array(WinnerSchema),
});

export type GetRankHistoriesRequest = z.infer<typeof GetRankHistoriesRequestSchema>;
export type GetRankHistoriesResponse = z.infer<typeof GetRankHistoriesResponseSchema>;

export const getRankHistories = async (request: GetRankHistoriesRequest) => {
  return safeRenderGet(GetRankHistoriesResponseSchema)(`/ranks/histories?rankType=${request.rankType}`);
};
