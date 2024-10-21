import z from 'zod';
import { safePost } from '../_instance/safe';

const DropPetResponseSchema = z.object({
  id: z.union([z.number(), z.string()]),
  personaId: z.union([z.number(), z.string()]),
  droppedUserId: z.union([z.number(), z.string()]),
  givenPoint: z.number(),
});

const DropPetRequestSchema = z.object({
  personaId: z.string(),
});

export type DropPetResponse = z.infer<typeof DropPetResponseSchema>;
export type DropPetRequest = z.infer<typeof DropPetRequestSchema>;

export const dropPet = async ({ personaId }: DropPetRequest): Promise<DropPetResponse> => {
  return safePost(DropPetResponseSchema)(`/shops/drop/${personaId}`);
};
