/**
 * common schema
 */

import z from 'zod';

export const PaginationSchema = z.object({
  totalRecords: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  nextPage: z.number().nullable(),
  prevPage: z.number().nullable(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
