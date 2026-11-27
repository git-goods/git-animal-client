import type { ApiErrorScheme, Persona } from '@gitanimals/api';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';

import { renderPatch } from '../render';

interface ChangePersonaVisibleRequest {
  personaId: string;
  visible: boolean;
}

type ChangePersonaVisibleResponse = Persona;

const changePersonaVisible = async (request: ChangePersonaVisibleRequest): Promise<ChangePersonaVisibleResponse> => {
  const response = await renderPatch<AxiosResponse<ChangePersonaVisibleResponse>>(`/personas`, request);
  return response.data;
};

// 백엔드는 보유하지 않은 persona 거나 visible 이 이미 30개 이상이면 예외를 던진다.
export const useChangePersonaVisible = (
  options?: UseMutationOptions<ChangePersonaVisibleResponse, AxiosError<ApiErrorScheme>, ChangePersonaVisibleRequest>,
) =>
  useMutation<ChangePersonaVisibleResponse, AxiosError<ApiErrorScheme>, ChangePersonaVisibleRequest>({
    mutationFn: changePersonaVisible,
    ...options,
  });
