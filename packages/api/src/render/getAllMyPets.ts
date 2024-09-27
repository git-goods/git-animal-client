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

export type PersonasResponse = z.infer<typeof PersonaSchema>;

export type GetAllMyPersonasRequest = z.infer<typeof GetAllPersonasRequestSchema>;
export type GetAllMyPersonasResponse = z.infer<typeof GetAllPersonasResponseSchema>;

//
export const getAllMyPets = (request: GetAllMyPersonasRequest): Promise<GetAllMyPersonasResponse> => {
  return safeRenderGet(GetAllPersonasResponseSchema)(`/users/${request.username}`);
};
