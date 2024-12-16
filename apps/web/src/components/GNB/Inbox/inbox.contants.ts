import type { Inbox } from '@gitanimals/api';

const MAIN_IMAGE = 'https://avatars.githubusercontent.com/u/171903401?s=200&v=4';

export const INBOX_NOTICE: Inbox[] = [
  {
    id: '1',
    image: MAIN_IMAGE,
    title: 'github-star-title',
    body: 'github-star-body',
    redirectTo: 'https://github.com/git-goods/gitanimals',
    type: 'NOTICE',
    status: 'UNREAD',
    publishedAt: '',
  },
  {
    id: '2',
    image: MAIN_IMAGE,
    title: 'event-christmas-title',
    body: 'event-christmas-body',
    redirectTo: 'https://github.com/git-goods/gitanimals',
    type: 'NOTICE',
    status: 'UNREAD',
    publishedAt: '',
  },
];
