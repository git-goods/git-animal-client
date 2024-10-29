import z from 'zod';

export const BackgroundSchema = z.object({
  type: z.string(),
  price: z.string(),
});

export type Background = z.infer<typeof BackgroundSchema>;
