import z from 'zod';
import { GuildSchema } from './schema';
import { renderGet } from '../_instance';
import { getUser } from '../user';

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

export const checkIsLeader = async (guildId: string): Promise<boolean> => {
  const guild = await getGuildById({ guildId: guildId });
  const user = await getUser();

  return guild.leader.userId === user.id;
};

export const checkIsMyGuild = async (guildId: string): Promise<boolean> => {
  const guild = await getGuildById({ guildId: guildId });
  const user = await getUser();

  return guild.leader.userId === user.id || guild.members.some((member) => member.userId === user.id);
};
