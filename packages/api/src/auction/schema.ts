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
  paymentState: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

export const PaginationSchema = z.object({
  totalRecords: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

export const HistoryProductSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  persona: z.object({
    personaId: z.string(),
    personaType: z.string(),
    personaLevel: z.number(),
  }),
  price: z.string(),
  paymentState: z.string(),
  receipt: z.object({
    buyerId: z.string(),
    soldAt: z.string(),
  }),
});

export type HistoryProduct = z.infer<typeof HistoryProductSchema>;
