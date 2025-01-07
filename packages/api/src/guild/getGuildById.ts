import z from 'zod';
import { safeRenderGet } from '../_instance/safe';
import { GuildSchema } from './schema';
import { renderGet } from '../_instance';

const GetGuildByIdRequestSchema = z.object({
  guildId: z.string(),
});

const GetGuildByIdResponseSchema = GuildSchema;

export type GetGuildByIdRequest = z.infer<typeof GetGuildByIdRequestSchema>;
export type GetGuildByIdResponse = z.infer<typeof GetGuildByIdResponseSchema>;

export const getGuildById = async (request: GetGuildByIdRequest): Promise<GetGuildByIdResponse> => {
  return renderGet(`/guilds/${request.guildId}`);
  // return safeRenderGet(GetGuildByIdResponseSchema)(`/guilds/${request.guildId}`);
};