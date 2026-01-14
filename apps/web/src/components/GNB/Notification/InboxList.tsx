/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind/utils';
import type { Inbox } from '@gitanimals/api';
import { inboxQueries, useReadInbox } from '@gitanimals/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { Link } from '@/i18n/routing';
import { customScrollStyle } from '@/styles/scrollStyle';

import { AnimatePortal } from '../../Portal';

export const InboxList = ({ isOpen, list }: { isOpen: boolean; list: Inbox[] }) => {
  const t = useTranslations('Layout');

  return (
    <AnimatePortal isShowing={isOpen}>
      <article
        className={cn(
          'flex flex-col fixed top-[calc(24px+68px)] right-6 min-h-[400px] max-h-[600px]',
          'overflow-hidden rounded-lg z-popover',
          'bg-white/20 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[20px]',
          'text-left w-[375px]'
        )}
      >
        <h3 className="flex items-center justify-center font-product text-glyph-20 font-bold h-20 bg-white/25 text-white shrink-0">
          {t('notification')}
        </h3>
        <ul
          className={cn(
            'flex flex-col overflow-auto',
            '[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-white/25',
            customScrollStyle
          )}
        >
          {list?.map((item) => <InboxItem key={item.id + item.status} {...item} />)}
        </ul>
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
      <div
        className={cn(
          'grid grid-cols-[36px_1fr] py-6 pr-5 pl-[23px] gap-3 items-start',
          'text-white relative border-b border-white/25 last:border-b-0',
          status === 'UNREAD' ? 'bg-black/10' : 'bg-transparent',
          '[&_.unread-indicator]:w-[5px] [&_.unread-indicator]:h-[5px] [&_.unread-indicator]:bg-white/75',
          '[&_.unread-indicator]:rounded-full [&_.unread-indicator]:absolute [&_.unread-indicator]:top-[39.5px] [&_.unread-indicator]:left-3',
          '[&_.image]:w-9 [&_.image]:h-9 [&_.image]:overflow-hidden [&_.image]:rounded-full',
          '[&_.body]:text-left [&_.body]:font-product [&_.body]:text-glyph-15 [&_.body]:text-white/90'
        )}
      >
        {status === 'UNREAD' && <div className="unread-indicator" />}
        <img className="image" src={image} alt={title} width={36} height={36} />
        <div>
          <span className="block text-left font-product text-glyph-16 font-bold">{title}</span>
          <p className="body">{body}</p>
        </div>
      </div>
    </Comp>
  );
}
