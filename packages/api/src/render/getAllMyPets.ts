import z from 'zod';
import { safeRenderGet } from '../_instance/safe';
import { PersonaSchema } from './schema';

const GetAllPersonasRequestSchema = z.object({ username: z.string() });
const GetAllPersonasResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  personas: z.array(PersonaSchema),
});

export type GetAllMyPersonasRequest = z.infer<typeof GetAllPersonasRequestSchema>;
export type GetAllMyPersonasResponse = z.infer<typeof GetAllPersonasResponseSchema>;

export const getAllPets = async (username: string) => safeRenderGet(GetAllPersonasResponseSchema)(`/users/${username}`);
