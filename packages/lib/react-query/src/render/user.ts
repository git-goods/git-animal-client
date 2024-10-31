import {
  ChangeMyBackgroundRequest,
  ChangeMyBackgroundResponse,
  changeMyBackground,
  changeMyBackgroundByToken,
} from '@gitanimals/api';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useChangeMyBackground = () =>
  useMutation({
    mutationFn: (request: ChangeMyBackgroundRequest) => changeMyBackground(request),
  });

export const useChangeMyBackgroundByToken = (
  token: string,
  options?: UseMutationOptions<ChangeMyBackgroundResponse, unknown, ChangeMyBackgroundRequest>,
) =>
  useMutation({
    mutationFn: (request: ChangeMyBackgroundRequest) => changeMyBackgroundByToken(request, token),
    ...options,
  });
