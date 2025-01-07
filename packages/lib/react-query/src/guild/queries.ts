import { getGuildBackgrounds, getGuildById, getGuildIcons } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const guildQueries = {
  allKey: () => ['guild'],
  getGuildById: (guildId: string) => ['guild', guildId],
  getGuildByIdOptions: (guildId: string) =>
    queryOptions({
      queryKey: guildQueries.getGuildById(guildId),
      queryFn: () => getGuildById({ guildId }),
    }),

  getGuildIcons: () => ['guild', 'icons'],
  getGuildIconsOptions: () =>
    queryOptions({
      queryKey: guildQueries.getGuildIcons(),
      queryFn: () => getGuildIcons(),
    }),
  getGuildBackgrounds: () => ['guild', 'backgrounds'],
  getGuildBackgroundsOptions: () =>
    queryOptions({
      queryKey: guildQueries.getGuildBackgrounds(),
      queryFn: () => getGuildBackgrounds(),
    }),
};
