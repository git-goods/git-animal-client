import z from 'zod';
import { renderPost } from '../_instance';

const JoinGuildRequestSchema = z.object({
  guildId: z.string(),
  personaId: z.string(),
});

const JoinGuildResponseSchema = z.void();

export type JoinGuildRequest = z.infer<typeof JoinGuildRequestSchema>;
export type JoinGuildResponse = z.infer<typeof JoinGuildResponseSchema>;

export const joinGuild = async (request: JoinGuildRequest): Promise<JoinGuildResponse> => {
  return renderPost(`/guilds/${request.guildId}`, { personaId: request.personaId });
};
