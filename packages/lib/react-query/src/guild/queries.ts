import { getGuildById } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const guildQueries = {
  getGuildById: (guildId: string) => ['guild', guildId],
  getGuildByIdOptions: (guildId: string) =>
    queryOptions({
      queryKey: guildQueries.getGuildById(guildId),
      queryFn: () => getGuildById({ guildId }),
    }),
};
