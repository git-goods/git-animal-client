/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { center } from '_panda/patterns';
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
          <span className={titleStyle}>{title}</span>
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
    '& > *:not(:last-child)': {
      borderBottom: '1px solid',
      borderColor: 'white.white_25',
    },
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

const titleStyle = css({
  display: 'block',
  textAlign: 'left',
  textStyle: 'glyph16.bold',
});
