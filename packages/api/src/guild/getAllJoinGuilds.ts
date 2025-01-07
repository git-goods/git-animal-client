// 토큰에 해당하는 유저가 참여중인 모든 길드를 조회합니다.

import z from 'zod';
import { GuildSchema } from './schema';
import { safeRenderGet } from '../_instance/safe';

const GetAllJoinGuildsResponseSchema = z.object({
  guilds: z.array(GuildSchema),
});

export type GetAllJoinGuildsResponse = z.infer<typeof GetAllJoinGuildsResponseSchema>;

export const getAllJoinGuilds = async (): Promise<GetAllJoinGuildsResponse> => {
  return safeRenderGet(GetAllJoinGuildsResponseSchema)(`/guilds`);
};
