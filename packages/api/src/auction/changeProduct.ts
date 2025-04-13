import z from 'zod';
import { safePatch } from '../_instance/safe';

const ChangeProductPersonaSchema = z.object({
  personaId: z.string(),
  personaType: z.string(),
  personaLevel: z.number(),
});

const ChangeProductResponseSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  persona: ChangeProductPersonaSchema,
  price: z.string(),
  paymentState: z.string(),
  receipt: z.string().nullable(),
});

const ChangeProductRequestSchema = z.object({
  price: z.string(),
  id: z.string(),
});

export type ChangeProductRequest = z.infer<typeof ChangeProductRequestSchema>;
export type ChangeProductResponse = z.infer<typeof ChangeProductResponseSchema>;

export const changeProduct = async (request: ChangeProductRequest): Promise<ChangeProductResponse> =>
  safePatch(ChangeProductResponseSchema)(`/auctions/products`, request);
