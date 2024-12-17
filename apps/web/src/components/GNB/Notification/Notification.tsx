'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { center } from '_panda/patterns';
import { inboxQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { BellIcon } from 'lucide-react';

import { InboxList } from './InboxList';
import { INBOX_NOTICE } from './notification.contants';

export const Notification = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({ fallback: <BellIcon size={24} /> })
  .on(function Notification() {
    const t = useTranslations('Inbox');
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useSuspenseQuery(inboxQueries.getAllUnreadInboxOptions());

    const inboxCount = data.inboxes.filter((inbox) => inbox.status === 'UNREAD').length + INBOX_NOTICE.length;
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
