import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const GetMyBackgroundResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  backgrounds: z.array(z.object({ type: z.string() })),
});

export type GetMyBackgroundResponse = z.infer<typeof GetMyBackgroundResponseSchema>;

export const getMyBackground = async (username: string) =>
  safeRenderGet(GetMyBackgroundResponseSchema)(`/users/${username}/backgrounds`);
