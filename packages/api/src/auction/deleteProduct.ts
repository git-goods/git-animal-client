import z from 'zod';
import { safeDel } from '../_instance/safe';

const DeleteProductResponseSchema = z.object({
  id: z.string(),
});

export type DeleteProductResponse = z.infer<typeof DeleteProductResponseSchema>;

export const deleteProduct = async (productId: string): Promise<DeleteProductResponse> =>
  safeDel(DeleteProductResponseSchema)(`/auctions/products/${productId}`);
