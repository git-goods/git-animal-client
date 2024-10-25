import z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  persona: z.object({
    personaId: z.string(),
    personaType: z.string(),
    personaLevel: z.number(),
  }),
  price: z.string(),
  paymentState: z.union([z.literal('ON_SALE'), z.literal('SOLD_OUT'), z.literal('SELL')]),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductStatusType = Product['paymentState'];

export const PaginationSchema = z.object({
  totalRecords: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const HistoryProductSchema = z.object({
  ...ProductSchema.shape,
  receipt: z.object({
    buyerId: z.string(),
    soldAt: z.string(),
  }),
});

export type HistoryProduct = z.infer<typeof HistoryProductSchema>;

export const OrderTypeSchema = z.union([z.literal('PRICE'), z.literal('CREATED_AT'), z.literal('LEVEL')]);
export type OrderType = z.infer<typeof OrderTypeSchema>;

export const SortDirectionSchema = z.union([z.literal('ASC'), z.literal('DESC')]);
export type SortDirection = z.infer<typeof SortDirectionSchema>;

export const PaginationRequestSchema = z.object({
  pageNumber: z.number().optional(),
  count: z.number().optional(),
});

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;
