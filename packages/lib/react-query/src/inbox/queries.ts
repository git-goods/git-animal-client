import { getAllUnreadInbox } from '@gitanimals/api';
import { queryOptions } from '@tanstack/react-query';

export const inboxQueries = {
  allKey: () => ['inbox'],
  getAllUnreadInboxOptions: () =>
    queryOptions({
      queryKey: inboxQueries.allKey(),
      queryFn: () => getAllUnreadInbox(),
    }),
};
