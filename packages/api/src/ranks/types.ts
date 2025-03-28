import { z } from 'zod';

export const RankSchema = z.object({
  rank: z.number(),
  image: z.string(),
  name: z.string(),
  contributions: z.number(),
});

export type RankType = z.infer<typeof RankSchema>;
