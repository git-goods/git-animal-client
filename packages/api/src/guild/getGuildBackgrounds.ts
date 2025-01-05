import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const GetGuildBackgroundsResponseSchema = z.object({
  backgrounds: z.array(z.string()),
});

export type GetGuildBackgroundsResponse = z.infer<typeof GetGuildBackgroundsResponseSchema>;

export const getGuildBackgrounds = () => {
  return safeRenderGet(GetGuildBackgroundsResponseSchema)('/guilds/backgrounds');
};
