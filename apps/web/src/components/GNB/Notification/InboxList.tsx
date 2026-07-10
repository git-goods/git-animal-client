/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import type { Inbox } from '@gitanimals/api';
import { inboxQueries, useReadInbox } from '@gitanimals/react-query';
import { cn } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';

import { Link } from '@/i18n/routing';
import { customScrollStyle } from '@/styles/scrollStyle';

import { AnimatePortal } from '../../Portal';

const inboxContainerClass =
  'fixed right-[24px] top-[calc(24px+68px)] z-popover flex w-[375px] min-h-[400px] max-h-[600px] flex-col overflow-hidden rounded-[8px] bg-[rgba(255,255,255,0.20)] text-left shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] backdrop-blur-[20px]';
const headingClass = 'glyph20-bold flex h-[80px] shrink-0 items-center justify-center bg-white-25 text-white';
const inboxClass =
  'relative grid grid-cols-[36px_1fr] items-start gap-[12px] border-b border-white-25 pb-[24px] pl-[23px] pr-[20px] pt-[24px] text-white last:border-b-0';
const titleClass = 'block glyph16-bold text-left';

export const InboxList = ({ isOpen, list }: { isOpen: boolean; list: Inbox[] }) => {
  const t = useTranslations('Layout');

  return (
    <AnimatePortal isShowing={isOpen}>
      <article className={inboxContainerClass}>
        <h3 className={headingClass}>{t('notification')}</h3>
        <ul
          className={cn(
            'flex flex-col overflow-auto [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-white-25',
            customScrollStyle,
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
      <div className={cn(inboxClass, status === 'UNREAD' ? 'bg-black-10' : 'bg-transparent')}>
        {status === 'UNREAD' && (
          <div className="absolute left-[12px] top-[39.5px] h-[5px] w-[5px] rounded-full bg-white-75" />
        )}
        <img className="h-[36px] w-[36px] overflow-hidden rounded-full" src={image} alt={title} width={36} height={36} />
        <div>
          <span className={titleClass}>{title}</span>
          <p className="glyph15-regular text-left text-white-90">{body}</p>
        </div>
      </div>
    </Comp>
  );
}
