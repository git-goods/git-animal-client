import z from 'zod';
import { safeRenderPost } from '../_instance/safe';

const CreateGuildRequestSchema = z.object({
  title: z.string(),
  body: z.string(),
  guildIcon: z.string(),
  autoJoin: z.boolean(),
  farmType: z.string(), // background
  personaId: z.string(),
});

const CreateGuildResponseSchema = z.object({
  id: z.string(),
});

export type CreateGuildRequest = z.infer<typeof CreateGuildRequestSchema>;
export type CreateGuildResponse = z.infer<typeof CreateGuildResponseSchema>;

export const createGuild = (request: CreateGuildRequest): Promise<CreateGuildResponse> => {
  return safeRenderPost(CreateGuildResponseSchema)('/guilds', request);
};
