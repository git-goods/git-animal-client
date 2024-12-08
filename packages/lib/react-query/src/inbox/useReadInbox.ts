import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { readInboxById, ReadInboxByIdRequest } from '@gitanimals/api';

export const useReadInbox = (options?: UseMutationOptions<void, Error, ReadInboxByIdRequest>) => {
  return useMutation({
    mutationFn: readInboxById,
    ...options,
  });
};

export const useReadInboxes = (
  options?: UseMutationOptions<PromiseSettledResult<void>[], Error, ReadInboxByIdRequest[]>,
) => {
  return useMutation({
    mutationFn: (requests) => Promise.allSettled(requests.map((request) => readInboxById(request))),
    ...options,
  });
};
