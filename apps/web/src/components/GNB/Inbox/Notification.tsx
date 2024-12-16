'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { center } from '_panda/patterns';
import type { Inbox } from '@gitanimals/api';
import { inboxQueries, useReadInbox } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { BellIcon } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { customScrollStyle } from '@/styles/scrollStyle';

import { AnimatePortal } from '../../Portal';

import { INBOX_NOTICE } from './inbox.contants';

export const Notification = wrap
  .ErrorBoundary({ fallback: <BellIcon size={24} /> })
  .Suspense({ fallback: <BellIcon size={24} /> })
  .on(function Notification() {
    const t = useTranslations('Inbox');
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useSuspenseQuery(inboxQueries.getAllUnreadInboxOptions());

    const inboxCount = data.inboxes.filter((inbox) => inbox.status === 'UNREAD').length;
    const inboxList = [
      ...INBOX_NOTICE.map((item) => ({ ...item, title: t(item.title), body: t(item.body) })),
      ...data.inboxes,
    ];

    return (
      <div>
        <button className={notificationStyle} onClick={() => setIsOpen((prev) => !prev)}>
          <BellIcon size={24} />
          {inboxCount > 0 && <div className={countStyle}>{inboxCount}</div>}
        </button>

        <InboxList isOpen={isOpen} list={inboxList} />
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
  const t = useTranslations('Layout');

  return (
    <AnimatePortal isShowing={isOpen}>
      <article className={inboxContainerStyle}>
        <h3 className={headingStyle}>{t('notification')}</h3>
        <ul className={inboxListStyle}>{list?.map((item) => <InboxItem key={item.id + item.status} {...item} />)}</ul>
      </article>
    </AnimatePortal>
  );
};

function InboxItem({ image, title, body, redirectTo, status, id }: Inbox) {
  const queryClient = useQueryClient();

  const { mutate: readInbox } = useReadInbox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inboxQueries.allKey() });
    },
  });

  const Comp = redirectTo !== 'NO_REDIRECT' ? Link : 'button';

  return (
    <Comp href={redirectTo} onClick={() => readInbox({ inboxId: id })}>
      <div className={cx(inboxStyle, css({ backgroundColor: status === 'UNREAD' ? 'black.black_10' : 'transparent' }))}>
        {status === 'UNREAD' && <div className="unread-indicator" />}
        <img className="image" src={image} alt={title} width={36} height={36} />
        <div>
          <p className="title">{title}</p>
          <p className="body">{body}</p>
        </div>
      </div>
    </Comp>
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
  textAlign: 'left',
});

const headingStyle = center({
  textStyle: 'glyph20.bold',
  height: '80px',
  backgroundColor: 'white.white_25',
  color: 'white',
  flexShrink: 0,
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
  borderBottom: '1px solid',
  borderColor: 'white.white_25',
  '&:last-child': {
    borderBottom: 'none',
  },

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
    textAlign: 'left',
    textStyle: 'glyph16.bold',
  },
  '& .body': {
    textAlign: 'left',
    textStyle: 'glyph15.regular',
    color: 'white.white_90',
  },
});
