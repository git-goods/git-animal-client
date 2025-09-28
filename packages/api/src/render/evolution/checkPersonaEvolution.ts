import z from 'zod';
import { safeRenderGet } from '../../_instance/safe';

const CheckPersonaEvolutionResponseSchema = z.object({
  evolutionAble: z.boolean(), // 진화 가능한지
});

export type CheckPersonaEvolutionResponse = z.infer<typeof CheckPersonaEvolutionResponseSchema>;

export const checkPersonaEvolution = async (personaId: string) =>
  safeRenderGet(CheckPersonaEvolutionResponseSchema)(`/personas/${personaId}/evolution`);
