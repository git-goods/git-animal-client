import z from 'zod';
import { safeGet } from '../_instance/safe';

const ProductTypeSchema = z.object({
  name: z.string(),
});

const GetProductsTypesSchema = z.object({
  productTypes: z.array(ProductTypeSchema),
});

export type ProductType = z.infer<typeof ProductTypeSchema>;
export type GetProductsTypesResponse = z.infer<typeof GetProductsTypesSchema>;

export const getProductsTypes = () => safeGet(GetProductsTypesSchema)(`/auctions/products/types`);
