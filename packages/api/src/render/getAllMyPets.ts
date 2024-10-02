import z from 'zod';
import { safeRenderGet } from '../_instance/safe';
import { PersonaSchema } from './schema';

const GetAllPersonasResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  personas: z.array(PersonaSchema),
});

export type GetAllMyPersonasResponse = z.infer<typeof GetAllPersonasResponseSchema>;

export const getAllMyPersonas = async (username: string) =>
  safeRenderGet(GetAllPersonasResponseSchema)(`/users/${username}`);
