import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { post } from '..';

interface UseGotchaResponse {
  id: string;
  name: string;
  ratio: string;
}

interface UseGotchaRequest {
  type?: string;
}

const getGotcha = async <T = UseGotchaResponse>({ type = 'DEFAULT' }: UseGotchaRequest): Promise<T> =>
  post('/gotchas', { type });

export const useGotcha = (option?: UseMutationOptions<UseGotchaResponse, unknown, UseGotchaRequest>) => {
  return useMutation<UseGotchaResponse, unknown, UseGotchaRequest>({
    mutationFn: getGotcha,
    ...option,
  });
};
