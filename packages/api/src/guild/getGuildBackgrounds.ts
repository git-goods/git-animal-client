import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const BackgroundSchema = z.string();
const GetGuildBackgroundsResponseSchema = z.object({
  backgrounds: z.array(BackgroundSchema),
});

export type GetGuildBackgroundsResponse = z.infer<typeof BackgroundSchema>[];

export const getGuildBackgrounds = async (): Promise<GetGuildBackgroundsResponse> => {
  const data = await safeRenderGet(GetGuildBackgroundsResponseSchema)('/guilds/backgrounds');

  return data.backgrounds;
};
