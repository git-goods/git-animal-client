import z from 'zod';
import { safeRenderGet } from '../_instance/safe';
import { renderGet } from '../_instance';

const PersonasSchema = z.object({
  id: z.string(),
  type: z.string(),
  level: z.string(),
  visible: z.boolean(),
  dropRate: z.string(),
});

const GetAllMyPetResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  personas: z.array(PersonasSchema),
});

export type PersonasResponse = z.infer<typeof PersonasSchema>;
export type GetAllMyPetResponse = z.infer<typeof GetAllMyPetResponseSchema>;

export const getAllMyPets = async (username: string) => {
  console.log('getAllMyPets username: ', username);
  return renderGet<GetAllMyPetResponse>(`/users/${username}`);
};
