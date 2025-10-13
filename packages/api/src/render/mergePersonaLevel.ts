import z from 'zod';
import { safeRenderPut } from '../_instance/safe';
import { PersonaSchema } from './schema';

const MergePersonaLevelRequestSchema = z.object({
  increasePersonaId: z.string(),
  deletePersonaId: z.string(),
});

const MergePersonaLevelResponseSchema = z.object({
  id: z.string(),
  type: z.string(),
  level: z.string(),
  visible: z.boolean(),
  dropRate: z.string(),
});

export type MergePersonaLevelRequest = z.infer<typeof MergePersonaLevelRequestSchema>;
export type MergePersonaLevelResponse = z.infer<typeof MergePersonaLevelResponseSchema>;

export const mergePersonaLevel = async (request: MergePersonaLevelRequest) =>
  safeRenderPut(MergePersonaLevelResponseSchema)(`/personas/merges`, request);

// token 강제 삽입 임시
export const mergePersonaLevelByToken = async (request: MergePersonaLevelRequest, token: string) =>
  safeRenderPut(MergePersonaLevelResponseSchema)(`/personas/merges`, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const MergePersonasRequestSchema = z.object({
  increasePersonaId: z.string(),
  deletePersonaId: z.array(z.string()),
});

const MergePersonasResponseSchema = PersonaSchema.pick({
  id: true,
  type: true,
  level: true,
  visible: true,
  dropRate: true,
});

export type MergePersonasRequest = z.infer<typeof MergePersonasRequestSchema>;
export type MergePersonasResponse = z.infer<typeof MergePersonasResponseSchema>;

export const mergePersonas = async (request: MergePersonasRequest) =>
  safeRenderPut(MergePersonasResponseSchema)(`/personas/merges`, request, {
    headers: {
      'Api-Version': '2',
    },
  });
