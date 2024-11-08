import { postGotcha, PostGotchaResponse } from '@gitanimals/api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type PostGotchaRequest = Parameters<typeof postGotcha>[0];

export const usePostGotcha = (options?: UseMutationOptions<PostGotchaResponse, unknown, PostGotchaRequest>) => {
  return useMutation({ mutationFn: (request: PostGotchaRequest) => postGotcha(request), ...options });
};
