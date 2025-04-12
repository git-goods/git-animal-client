import z from 'zod';
import { renderGet } from '../_instance';
import { RankSchema } from './types';

const GetRanksRequestSchema = z.object({
  rank: z.number(),
  size: z.number(),
  type: z.enum(['WEEKLY_GUILD_CONTRIBUTIONS', 'WEEKLY_USER_CONTRIBUTIONS']),
});

const GetRanksResponseSchema = z.array(RankSchema);

export type GetRanksRequest = z.infer<typeof GetRanksRequestSchema>;
export type GetRanksResponse = z.infer<typeof GetRanksResponseSchema>;

export const getRanks = async (request: GetRanksRequest) => {
  return await renderGet<GetRanksResponse>(`/ranks?rank=${request.rank}&size=${request.size}&type=${request.type}`);
};
