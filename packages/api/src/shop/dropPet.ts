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

export const dropPets = async ({ personaIds }: { personaIds: string[] }) => {
  const results = await Promise.allSettled(personaIds.map((id) => dropPet({ personaId: id })));

  const successResults: DropPetResponse[] = [];
  const errorResults: any[] = [];

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      successResults.push(result.value);
    } else {
      errorResults.push(result.reason);
    }
  });

  return {
    success: successResults,
    errors: errorResults,
  };
};
