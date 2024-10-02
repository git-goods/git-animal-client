import z from 'zod';
import { safeRenderGet } from '../_instance/safe';
import { PersonaInfoSchema } from './schema';

const GetAllPersonasResponseSchema = z.object({
  personas: z.array(PersonaInfoSchema),
});

export type GetAllPersonaResponse = z.infer<typeof GetAllPersonasResponseSchema>;

export const getAllPersona = () => safeRenderGet(GetAllPersonasResponseSchema)('/personas/infos');
