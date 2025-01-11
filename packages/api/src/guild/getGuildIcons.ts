// /guilds/icons

import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const IconSchema = z.string();
const GetGuildIconsResponseSchema = z.object({
  icons: z.array(IconSchema),
});

export type GetGuildIconsResponse = z.infer<typeof IconSchema>[];

export const getGuildIcons = async (): Promise<GetGuildIconsResponse> => {
  const data = await safeRenderGet(GetGuildIconsResponseSchema)('/guilds/icons');

  return data.icons;
};
