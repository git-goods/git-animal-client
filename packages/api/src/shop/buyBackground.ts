// /shops/backgrounds

import z from 'zod';
import { safePost } from '../_instance/safe';

// {
//     "type": "SNOWY"
//   }

const BuyBackgroundRequestSchema = z.object({
  type: z.string(),
});

const BuyBackgroundResponseSchema = z.any();

export type BuyBackgroundRequest = z.infer<typeof BuyBackgroundRequestSchema>;
export type BuyBackgroundResponse = z.infer<typeof BuyBackgroundResponseSchema>;
export const buyBackground = (request: BuyBackgroundRequest) => {
  return safePost(BuyBackgroundResponseSchema)('/shops/backgrounds', request);
};
