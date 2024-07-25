import z from 'zod';
import { safeRenderGet } from '../_instance/safe';

const GetTotalPersonaCountResponseSchema = z.object({
  personaCount: z.number(),
});

export type GetTotalPersonaCountResponse = z.infer<typeof GetTotalPersonaCountResponseSchema>;

export const getTotalPersonaCount = (): Promise<GetTotalPersonaCountResponse> => {
  return safeRenderGet(GetTotalPersonaCountResponseSchema)('/personas/statistics/total');
};
