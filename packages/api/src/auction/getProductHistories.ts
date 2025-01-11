import z from 'zod';
import { HistoryProductSchema } from './schema';
import { PaginationSchema } from '../schema';
import { safeGet } from '../_instance/safe';
import { convertCamelObjToKebab } from '../utils';

const GetProductHistoriesRequestSchema = z.object({
  pageNumber: z.number().optional(),
  personaType: z.string().optional(),
  count: z.number().optional(),
  orderType: z.union([z.literal('PRICE'), z.literal('CREATED_AT'), z.literal('LEVEL')]).optional(),
  sortDirection: z.union([z.literal('ASC'), z.literal('DESC')]).optional(),
});

const GetProductHistoriesResponseSchema = z.object({
  products: z.array(HistoryProductSchema),
  pagination: PaginationSchema,
});

export type GetProductHistoriesRequest = z.infer<typeof GetProductHistoriesRequestSchema>;
export type GetProductHistoriesResponse = z.infer<typeof GetProductHistoriesResponseSchema>;

export const getHistory = async (request?: GetProductHistoriesRequest): Promise<GetProductHistoriesResponse> => {
  return await safeGet(GetProductHistoriesResponseSchema)(`/auctions/products/histories`, {
    params: request ? convertCamelObjToKebab(request) : undefined,
  });
};
