import type { GetAllPersonaResponse } from '@gitanimals/api';
import { getAllPersona } from '@gitanimals/api';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAnimalTierInfo } from '@/utils/animals';

const useGetAllPersona = (options?: Omit<UseQueryOptions<GetAllPersonaResponse>, 'queryKey' | 'queryFn'>) =>
  useSuspenseQuery<GetAllPersonaResponse>({
    queryKey: ['persona', 'info', 'all'],
    queryFn: getAllPersona,
    ...options,
  });

/**
 * 페르소나의 드랍률을 가져오는 훅
 * @param personaType - 페르소나 타입
 * @returns 페르소나의 드랍률 (예: "1.2%")
 * @throws 페르소나를 찾을 수 없을 경우 에러
 */
export const useGetPersonaDropRate = (personaType: string) => {
  const {
    data: { personas },
  } = useGetAllPersona();
  const currentPersona = personas.find((persona) => persona.type === personaType);
  if (!currentPersona) throw new Error('unexpected persona');

  return currentPersona.dropRate;
};

export const useGetPersonaTier = (personaType: string) => {
  const dropRate = useGetPersonaDropRate(personaType);
  const tier = getAnimalTierInfo(Number(dropRate.replace('%', '')));
  return tier;
};
