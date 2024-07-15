import z from 'zod';
import { HistoryProductSchema, PaginationSchema, ProductSchema } from './schema';

export type Pagination = z.infer<typeof PaginationSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type HistoryProduct = z.infer<typeof HistoryProductSchema>;
