import z from 'zod';
import { renderPost } from '../_instance';

const ChangeMainPetRequestSchema = z.object({
  personaId: z.string(),
  guildId: z.string(),
});

export type ChangeMainPetRequest = z.infer<typeof ChangeMainPetRequestSchema>;

export const changeMainPet = async (request: ChangeMainPetRequest) => {
  return await renderPost(`/guilds/${request.guildId}/personas?persona-id=${request.personaId}`);
};
