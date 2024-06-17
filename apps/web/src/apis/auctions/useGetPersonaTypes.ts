import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { get } from '..';

interface GetPersonaTypesResponse {
  productTypes: { name: string }[];
}

const getPersonaTypes = () => get<GetPersonaTypesResponse>('/auctions/products/types');

// TODO : query option type utility로 분리
export const useGetPersonaTypes = (option?: Omit<UseQueryOptions<GetPersonaTypesResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery<GetPersonaTypesResponse>({
    queryKey: ['product', 'types'], // TODO : query key 관리 방식 변경하며 수정
    queryFn: getPersonaTypes,
    ...option,
  });
};
