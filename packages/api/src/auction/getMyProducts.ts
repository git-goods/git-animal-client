import z from 'zod';
import { PaginationRequestSchema, PaginationSchema, ProductSchema } from './schema';
import { safeGet } from '../_instance/safe';
import { convertCamelObjToKebab } from '../utils';

const GetMyProductsRequestSchema = PaginationRequestSchema;

const GetMyProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  pagination: PaginationSchema,
});

export type GetMyProductsRequest = z.infer<typeof GetMyProductsRequestSchema>;
export type GetMyProductsResponse = z.infer<typeof GetMyProductsResponseSchema>;

export const getMyProducts = async (request?: GetMyProductsRequest): Promise<GetMyProductsResponse> => {
  return await safeGet(GetMyProductsResponseSchema)(`/auctions/products/users`, {
    params: request ? convertCamelObjToKebab(request) : undefined,
  });
};
