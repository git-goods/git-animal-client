import z from 'zod';
import { renderGet } from '../_instance';

const GetRankByUsernameResponseSchema = z.object({
  id: z.string(),
  rank: z.number(),
  image: z.string(),
  name: z.string(),
  contributions: z.number(),
});

export type GetRankByUsernameResponse = z.infer<typeof GetRankByUsernameResponseSchema>;

export const getRankByUsername = async (username: string) => {
  return await renderGet<GetRankByUsernameResponse>(`/ranks/by-username/${username}`);
};
