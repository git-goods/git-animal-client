import z from 'zod';
import { safePost } from '../_instance/safe';

const BuyBackgroundRequestSchema = z.object({
  type: z.string(),
});

// TODO : @devxb 와 이야기해서 응닶값 변경
const BuyBackgroundResponseSchema = z.any();

export type BuyBackgroundRequest = z.infer<typeof BuyBackgroundRequestSchema>;
export type BuyBackgroundResponse = z.infer<typeof BuyBackgroundResponseSchema>;
export const buyBackground = (request: BuyBackgroundRequest) => {
  return safePost(BuyBackgroundResponseSchema)('/shops/backgrounds', request);
};
