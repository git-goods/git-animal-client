import z from 'zod';
import { safeGet } from '../_instance/safe';

const ProductSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  persona: z.object({
    personaId: z.string(),
    personaType: z.string(),
    personaLevel: z.number(),
  }),
  price: z.string(),
  paymentState: z.string(),
});

const PaginationSchema = z.object({
  totalRecords: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
});

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

export const getProducts = async (request?: GetProductsRequest) => {
  return await safeGet(GetProductsSchema)(`/auctions/products`);
};

export type Pagination = z.infer<typeof PaginationSchema>;
