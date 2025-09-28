// /personas/{personaId}/evolution

import z from 'zod';
import { safeRenderPost, safeRenderPut } from '../../_instance/safe';

const EvolutionPersonaResponseSchema = z.object({
  id: z.string(),
  type: z.string(),
  grade: z.enum(['DEFAULT', 'EVOLUTION']), // DEFAULT, EVOLUTION
});

export type EvolutionPersonaResponse = z.infer<typeof EvolutionPersonaResponseSchema>;

export const evolutionPersona = async (personaId: string) =>
  safeRenderPost(EvolutionPersonaResponseSchema)(`/personas/${personaId}/evolution`);
