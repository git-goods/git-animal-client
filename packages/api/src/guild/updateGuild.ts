import z from 'zod';
import { renderPatch } from '../_instance';

const UpdateGuildRequestSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
  farmType: z.string().optional(),
  guildIcon: z.string().optional(),
  autoJoin: z.boolean().optional(),
});

type UpdateGuildRequest = z.infer<typeof UpdateGuildRequestSchema>;

export const updateGuild = async (guildId: string, request: UpdateGuildRequest) => {
  return await renderPatch(`/guilds/${guildId}`, request);
};
