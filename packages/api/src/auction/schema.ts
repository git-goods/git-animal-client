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

export const PaginationSchema = z.object({
  totalRecords: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
});

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
