import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const PersonaSchema = z.object({
  type: z.string(),
  dropRate: z.string(),
});

const GetAllPersonasResponseSchema = z.object({
  personas: z.array(PersonaSchema),
});

export type GetAllPersonaResponse = z.infer<typeof GetAllPersonasResponseSchema>;

export const getAllPersona = () => safeRenderGet(GetAllPersonasResponseSchema)('/personas/infos');
