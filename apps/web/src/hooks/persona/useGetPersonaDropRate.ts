import { renderStatsQueries } from '@gitanimals/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAnimalTierInfo } from '@/utils/animals';

export const useGetPersonaDropRate = (personaType: string) => {
  const {
    data: { personas },
  } = useSuspenseQuery(renderStatsQueries.allPersonaOptions());
  const currentPersona = personas.find((persona) => persona.type === personaType);
  if (!currentPersona) throw new Error('unexpected persona');

  return currentPersona.dropRate;
};

export const useGetPersonaTier = (personaType: string) => {
  const dropRate = useGetPersonaDropRate(personaType);
  const tier = getAnimalTierInfo(Number(dropRate.replace('%', '')));
  return tier;
};
