import z from 'zod';
import { PaginationSchema } from '../schema';
import { GuildSchema } from './schema';
import { convertCamelObjToKebab } from '../utils';
import { renderGet } from '../_instance';

const FilterSchema = z.enum(['RANDOM', 'PEOPLE_ASC', 'PEOPLE_DESC', 'CONTRIBUTION_ASC', 'CONTRIBUTION_DESC']);
export type FilterType = z.infer<typeof FilterSchema>;

const SearchGuildRequestSchema = z.object({
  pageNumber: z.number().optional(),
  filter: FilterSchema.optional(),
  text: z.string().optional(),
  key: z.number(),
});

const SearchGuildResponseSchema = z.object({
  guilds: z.array(GuildSchema),
  pagination: PaginationSchema,
});

export type SearchGuildRequest = z.infer<typeof SearchGuildRequestSchema>;
export type SearchGuildResponse = z.infer<typeof SearchGuildResponseSchema>;

export const searchGuild = async (request: SearchGuildRequest): Promise<SearchGuildResponse> => {
  return renderGet('/guilds/search', {
    params: request ? convertCamelObjToKebab(request) : undefined,
  });
};

export const generateRandomKey = () => {
  return Math.floor(Math.random() * 1000000);
};
