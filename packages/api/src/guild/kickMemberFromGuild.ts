import z from 'zod';
import { renderDelete } from '../_instance';

const KickMemberFromGuildRequest = z.object({
  userId: z.string(),
  guildId: z.string(),
});

export type KickMemberFromGuildRequest = z.infer<typeof KickMemberFromGuildRequest>;

export const kickMemberFromGuild = async (request: KickMemberFromGuildRequest) => {
  return renderDelete(`/guilds/${request.guildId}`, {
    params: {
      'user-id': request.userId,
    },
  });
};
