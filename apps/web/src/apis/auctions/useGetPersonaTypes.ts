import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { get } from '..';

interface GetPersonaTypesResponse {
  productTypes: { name: string }[];
}

const getPersonaTypes = async (): Promise<GetPersonaTypesResponse> => get('/auctions/products/types');

export const useGetPersonaTypes = (option?: Omit<UseQueryOptions<GetPersonaTypesResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery<GetPersonaTypesResponse>({
    queryKey: ['product', 'types'],
    queryFn: getPersonaTypes,
    ...option,
  });
};
