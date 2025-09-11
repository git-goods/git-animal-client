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

/**
 *
 * 토큰에 해당하는 유저가 personaId에 해당하는 persona를 갖고있다면 해당 persona의 visible을 변경합니다.
 * 만약, 갖고있지 않거나, 이미 visible 상태인 persona의 수가 30개 이상이라면, 예외를 던집니다.
 * @returns
 */
export const useChangePersonaVisible = (
  options?: UseMutationOptions<ChangePersonaVisibleResponse, AxiosError<ApiErrorScheme>, ChangePersonaVisibleRequest>,
) =>
  useMutation<ChangePersonaVisibleResponse, AxiosError<ApiErrorScheme>, ChangePersonaVisibleRequest>({
    mutationFn: changePersonaVisible,
    ...options,
  });
