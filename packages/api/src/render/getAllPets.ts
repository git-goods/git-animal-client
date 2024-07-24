import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const PersonaSchema = z.object({
  id: z.string(),
  type: z.string(),
  level: z.string(),
  visible: z.boolean(),
  dropRate: z.string(),
});

const GetAllPersonasRequestSchema = z.object({ username: z.string() });
const GetAllPersonasResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  personas: z.array(PersonaSchema),
});

export type RenderPersonaItem = z.infer<typeof PersonaSchema>;

export type GetAllPersonasRequest = z.infer<typeof GetAllPersonasRequestSchema>;
export type GetAllPersonasResponse = z.infer<typeof GetAllPersonasResponseSchema>;

export const getAllPets = (request: GetAllPersonasRequest): Promise<GetAllPersonasResponse> => {
  return safeRenderGet(GetAllPersonasResponseSchema)(`/users/${request.username}`);
};
