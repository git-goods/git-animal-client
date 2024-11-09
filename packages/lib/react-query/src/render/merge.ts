// mergePersonaLevel

import {
  MergePersonaLevelResponse,
  MergePersonaLevelRequest,
  mergePersonaLevel,
  mergePersonaLevelByToken,
} from '@gitanimals/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useMergePersonaLevel = (
  options?: UseMutationOptions<MergePersonaLevelResponse, unknown, MergePersonaLevelRequest>,
) =>
  useMutation({
    mutationFn: (request: MergePersonaLevelRequest) => mergePersonaLevel(request),
    ...options,
  });

export const useMergePersonaLevelByToken = (
  token: string,
  options?: UseMutationOptions<MergePersonaLevelResponse, unknown, MergePersonaLevelRequest>,
) =>
  useMutation({
    mutationFn: (request: MergePersonaLevelRequest) => mergePersonaLevelByToken(request, token),
    ...options,
  });
