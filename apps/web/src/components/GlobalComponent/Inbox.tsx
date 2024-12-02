/* eslint-disable @next/next/no-img-element */
import { css, cx } from '_panda/css';
import type { Inbox } from '@gitanimals/api';
import { inboxQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { Link } from '@/i18n/routing';

export function Inbox() {
  const { data } = useQuery(inboxQueries.getAllUnreadInboxOptions());
  console.log('data: ', data);

  const dummy = [
    {
      id: '1234678128323414',
      image: 'https://static.gitanimals.org/inbox/images/guild-join.png',
      title: '길드 가입요청이 왔어요.',
      body: 'devxb에게 git-goods 길드가입 요청이 왔어요.',
      redirectTo: '/auctions/',
      type: 'INBOX', // (INBOX, NOTICE...)
      status: 'UNREAD', // READ or UNREAD
    },
    {
      id: '1234678323414',
      image: 'https://static.gitanimals.org/inbox/images/guild-join.png',
      title: '길드 가입요청이 왔어요.',
      body: 'devxb에게 git-goods 길드가입 요청이 왔어요.',
      redirectTo: '/auctions/',
      type: 'INBOX', // (INBOX, NOTICE...)
      status: 'UNREAD', // READ or UNREAD
    },
  ] as Inbox[];

  return (
    <article>
      <ul className={inboxListStyle}>{dummy?.map((item) => <InboxItem key={item.id} {...item} />)}</ul>
    </article>
  );
}

function InboxItem({ image, title, body, redirectTo, status }: Inbox) {
  return (
    <Link href={redirectTo}>
      <div className={cx(inboxStyle, css({ backgroundColor: status === 'UNREAD' ? 'white.white_10' : 'transparent' }))}>
        {status === 'UNREAD' && <div className="unread-indicator" />}
        <img src={image} alt={title} width={36} height={36} />
        <div>
          <p className="title">{title}</p>
          <p className="body">{body}</p>
        </div>
      </div>
    </Link>
  );
}

const inboxListStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const inboxStyle = css({
  display: 'grid',
  gridTemplateColumns: '36px 1fr',
  paddingLeft: '23px',
  paddingRight: '20px',
  gap: '12px',
  alignItems: 'flex-start',

  '& .unread-indicator': {
    width: '5px',
    height: '5px',
    backgroundColor: 'white.white_75',
    borderRadius: '50%',
    position: 'absolute',
    top: '39.5px',
    left: '12px',
  },

  '& .title': {
    textStyle: 'glyph16.bold',
  },
  '& .body': {
    textStyle: 'glyph15.regular',
  },
});
