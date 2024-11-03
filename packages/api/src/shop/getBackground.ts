import z from 'zod';
import { safeGet } from '../_instance/safe';
import { BackgroundSchema } from './schema';

const GetBackgroundSchema = z.object({
  backgrounds: z.array(BackgroundSchema),
});

export type GetBackgroundResponse = z.infer<typeof GetBackgroundSchema>;

export const getBackground = async (): Promise<GetBackgroundResponse> => {
  return await safeGet(GetBackgroundSchema)('/shops/backgrounds');
};
