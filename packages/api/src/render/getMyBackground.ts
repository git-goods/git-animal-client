import z from 'zod';
import { safeRenderGet } from '../_instance/safe';
import { BackgroundSchema } from './schema';

const GetMyBackgroundResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  backgrounds: z.array(BackgroundSchema),
});

export type GetMyBackgroundResponse = z.infer<typeof GetMyBackgroundResponseSchema>;

export const getMyBackground = async (username: string) =>
  safeRenderGet(GetMyBackgroundResponseSchema)(`/users/${username}/backgrounds`);
