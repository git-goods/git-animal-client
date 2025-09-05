import z from 'zod';
import { safePost } from '../_instance/safe';

export interface RegisterProductRequest {
  personaId: string;
  price: number;
}

export type ProductStatusSchema = 'ON_SALE' | 'SOLD_OUT' | 'SELL';

const RegisterProductResponseSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  persona: z.object({
    personaId: z.string(),
    personaType: z.string(),
    personaLevel: z.number(),
  }),
  price: z.string(),
  paymentState: z.literal('ON_SALE').or(z.literal('SOLD_OUT')).or(z.literal('SELL')),
  receipt: z.object({
    buyerId: z.string(),
    soldAt: z.string(),
  }),
});

export type RegisterProductResponse = z.infer<typeof RegisterProductResponseSchema>;

export const registerProduct = async (request: RegisterProductRequest): Promise<RegisterProductResponse> => {
  return await safePost(RegisterProductResponseSchema)(`/auctions/products`, request);
};
