import z from 'zod';
import { safePost } from '../_instance/safe';

const DropPetResponseSchema = z.object({
  id: z.number(),
  personaId: z.number(),
  droppedUserId: z.number(),
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
