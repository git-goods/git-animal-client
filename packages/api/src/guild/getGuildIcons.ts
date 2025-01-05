// /guilds/icons

import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const GetGuildIconsResponseSchema = z.object({
  icons: z.array(z.string()),
});

export type GetGuildIconsResponse = z.infer<typeof GetGuildIconsResponseSchema>;

export const getGuildIcons = async (): Promise<GetGuildIconsResponse> => {
  return safeRenderGet(GetGuildIconsResponseSchema)('/guilds/icons');
};
