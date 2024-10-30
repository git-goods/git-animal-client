import z from 'zod';
import { PersonaSchema } from '../render';
import { safePatch } from '../_instance/safe';

const ChangeProductResponseSchema = z.object({
  sellerId: z.string(),
  persona: PersonaSchema,
  price: z.string(),
  paymentState: z.string(),
});

const ChangeProductRequestSchema = z.object({
  price: z.string(),
  id: z.string(),
});

export type ChangeProductRequest = z.infer<typeof ChangeProductRequestSchema>;
export type ChangeProductResponse = z.infer<typeof ChangeProductResponseSchema>;

export const changeProduct = async (request: ChangeProductRequest): Promise<ChangeProductResponse> =>
  safePatch(ChangeProductResponseSchema)(`/auctions/products`, request);
