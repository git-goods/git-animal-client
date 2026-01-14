'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
        <button className="relative" onClick={() => setIsOpen((prev) => !prev)}>
          <BellIcon size={24} />
          {inboxCount > 0 && (
            <div className="flex items-center justify-center rounded-xl bg-[#019C5A] absolute -top-2.5 -right-2.5 font-product text-glyph-12 w-[18px] h-[18px] text-white">
              {inboxCount}
            </div>
          )}
        </button>

        <InboxList isOpen={isOpen} list={inboxList} />
      </div>
    );
  });
