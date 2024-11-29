import type { Inbox } from '@gitanimals/api';
import { inboxQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

export function Inbox() {
  const { data } = useQuery(inboxQueries.getAllUnreadInboxOptions());
  console.log('data: ', data);

  return <article>{data?.map((item) => <InboxItem key={item.id} {...item} />)}</article>;
}

function InboxItem({ id, image, title, body, redirectTo, type }: Inbox) {
  return <div>{title}</div>;
}
