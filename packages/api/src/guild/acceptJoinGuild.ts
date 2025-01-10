import z from 'zod';
import { renderPost } from '../_instance';

const AcceptJoinGuildRequest = z.object({
  userId: z.string(),
  guildId: z.string(),
});

export type AcceptJoinGuildRequest = z.infer<typeof AcceptJoinGuildRequest>;

export const acceptJoinGuild = async (request: AcceptJoinGuildRequest) => {
  await renderPost(`/guilds/${request.guildId}/accepts?user-id=${request.userId}`);
};
