import { renderGet } from '../_instance';

export type GetOnlyPetRequest = {
  username: string;
  petId: string;
  secretKey: string;
};

export const getOnlyPet = async (request: GetOnlyPetRequest) => {
  const response = await renderGet<any>(`/lines/${request.username}/only-pets?pet-id=${request.petId}`, {
    headers: {
      'Image-Secret': request.secretKey,
    },
  });
  return response;
};
