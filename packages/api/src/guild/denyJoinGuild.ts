import z from 'zod';
import { renderPost } from '../_instance';

const DenyJoinGuildRequest = z.object({
  userId: z.string(),
  guildId: z.string(),
});

export type DenyJoinGuildRequest = z.infer<typeof DenyJoinGuildRequest>;

export const denyJoinGuild = async (request: DenyJoinGuildRequest) => {
  await renderPost(`/guilds/${request.guildId}/deny?user-id=${request.userId}`);
};
