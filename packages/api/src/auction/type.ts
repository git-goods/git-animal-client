import z from 'zod';
import { PaginationSchema, ProductSchema } from './schema';

export type Pagination = z.infer<typeof PaginationSchema>;
export type Product = z.infer<typeof ProductSchema>;
