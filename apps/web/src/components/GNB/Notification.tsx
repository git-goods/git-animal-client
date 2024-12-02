'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css, cx } from '_panda/css';
import { center } from '_panda/patterns';
import type { Inbox } from '@gitanimals/api';
import { inboxQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BellIcon } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { customScrollStyle } from '@/styles/scrollStyle';

import { AnimatePortal } from '../Portal';

export const Notification = wrap
  .ErrorBoundary({ fallback: <BellIcon size={24} /> })
  .Suspense({ fallback: <BellIcon size={24} /> })
  .on(function Notification() {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useSuspenseQuery(inboxQueries.getAllUnreadInboxOptions());

    return (
      <div>
        <button className={notificationStyle} onClick={() => setIsOpen((prev) => !prev)}>
          <BellIcon size={24} />
          <div className={countStyle}>{data.inboxes.length}</div>
        </button>

        <InboxList isOpen={isOpen} list={data.inboxes} />
      </div>
    );
  });

const notificationStyle = css({
  position: 'relative',
});

const countStyle = center({
  borderRadius: '12px',
  background: '#019C5A',
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  textStyle: 'glyph12.regular',
  width: '18px',
  height: '18px',
  color: 'white',
});

const InboxList = ({ isOpen, list }: { isOpen: boolean; list: Inbox[] }) => {
  return (
    <AnimatePortal isShowing={isOpen}>
      <article className={inboxContainerStyle}>
        <h3 className={headingStyle}>Notification</h3>
        <ul className={inboxListStyle}>{list?.map((item) => <InboxItem key={item.id} {...item} />)}</ul>
      </article>
    </AnimatePortal>
  );
};

function InboxItem({ image, title, body, redirectTo, status }: Inbox) {
  return (
    <Link href={redirectTo}>
      <div
        className={cx(inboxStyle, css({ backgroundColor: status === 'UNREAD' ? 'white.white_10' : 'black.black_10' }))}
      >
        {status === 'UNREAD' && <div className="unread-indicator" />}
        <img className="image" src={image} alt={title} width={36} height={36} />
        <div>
          <p className="title">{title}</p>
          <p className="body">{body}</p>
        </div>
      </div>
    </Link>
  );
}

const inboxContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: 'calc(24px + 68px)',
  right: '24px',
  minHeight: '400px',
  maxHeight: '600px',
  overflow: 'hidden',
  borderRadius: '8px',
  zIndex: 2000,
  background: 'rgba(255, 255, 255, 0.20)',
  boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(20px)',
});

const headingStyle = center({
  textStyle: 'glyph20.bold',
  height: '80px',
  backgroundColor: 'white.white_25',
  color: 'white',
});

const inboxListStyle = cx(
  css({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  }),
  customScrollStyle,
);

const inboxStyle = css({
  display: 'grid',
  gridTemplateColumns: '36px 1fr',
  padding: '24px 20px 24px 23px',
  gap: '12px',
  alignItems: 'flex-start',
  color: 'white',
  position: 'relative',

  '& .unread-indicator': {
    width: '5px',
    height: '5px',
    backgroundColor: 'white.white_75',
    borderRadius: '50%',
    position: 'absolute',
    top: '39.5px',
    left: '12px',
  },

  '& .image': {
    width: '36px',
    height: '36px',
    overflow: 'hidden',
    borderRadius: '50%',
  },

  '& .title': {
    textStyle: 'glyph16.bold',
  },
  '& .body': {
    textStyle: 'glyph15.regular',
    color: 'white.white_90',
  },
});
