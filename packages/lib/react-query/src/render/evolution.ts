import { checkPersonaEvolution, CheckPersonaEvolutionResponse, getMyBackground, isPressStar } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const evolutionQueries = {
  checkPersonaEvolutionQueryKey: (personaId: string) => ['render', 'evolution', personaId],
  checkPersonaEvolution: (personaId: string) =>
    queryOptions<CheckPersonaEvolutionResponse, Error>({
      queryKey: evolutionQueries.checkPersonaEvolutionQueryKey(personaId),
      queryFn: () => checkPersonaEvolution(personaId),
    }),
};
