import z from 'zod';
import { safeGet } from '../_instance/safe';
import { ProductSchema, PaginationSchema } from './schema';
import { convertCamelObjToKebab } from '../utils';

const GetProductsSchema = z.object({
  products: z.array(ProductSchema),
  pagination: PaginationSchema,
});

const GetProductsRequestSchema = z.object({
  pageNumber: z.number().optional(),
  personaType: z.string().optional(),
  count: z.number().optional(),
  orderType: z.union([z.literal('PRICE'), z.literal('CREATED_AT'), z.literal('LEVEL')]).optional(),
  sortDirection: z.union([z.literal('ASC'), z.literal('DESC')]).optional(),
});

export type GetProductsRequest = z.infer<typeof GetProductsRequestSchema>;
export type GetProductsResponse = z.infer<typeof GetProductsSchema>;

export const getProducts = async (request?: GetProductsRequest): Promise<GetProductsResponse> => {
  return await safeGet(GetProductsSchema)(`/auctions/products`, {
    params: request ? convertCamelObjToKebab(request) : undefined,
  });
};
