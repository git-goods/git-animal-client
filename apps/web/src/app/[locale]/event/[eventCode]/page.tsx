import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';

import { CardList, MobileCardList } from './CardList';
import { Draw } from './Draw';

interface Params {
  eventCode: string;
}

async function HalloweenEventPage({ params }: { params: Params }) {
  if (!params.eventCode) {
    notFound();
  }

  const now = new Date();
  const isAfterHalloween = now.getMonth() === 10 && now.getDate() > 7;
  if (isAfterHalloween) {
    // NOTE: 11월이 되면 그냥 이벤트 종료하는 식으로 하드 코딩
    // sendMessageToErrorChannel('할로윈 기간 지낫음 하드코딩한거 바꾸삼');
    // notFound();
  }

  const t = await getTranslations('Event.Halloween');

  return (
    <>
      <div className={containerStyle}>
        <Image
          src="/event/halloween/halloween-title.svg"
          alt="gitanimals halloween event"
          width={1357}
          height={199}
          objectFit="contain"
          className={logoImageStyle}
          draggable={false}
        />

        <h2 className={descriptionStyle}>{t('description')}</h2>
        <div className={showMobile}>
          <MobileCardList />
        </div>
        <div className={showDesktop}>
          <CardList />
        </div>

        <Draw />
      </div>
      {isAfterHalloween && <EventEndOverlay />}
    </>
  );
}

export default HalloweenEventPage;

function EventEndOverlay() {
  const t = useTranslations('Event');

  return (
    <div
      className={css({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        overflow: 'hidden',
      })}
    >
      <h1
        className={css({
          color: 'white',
          textAlign: 'center',
          textStyle: 'glyph32.bold',
        })}
      >
        {t('event-end')}
      </h1>
    </div>
  );
}

const showDesktop = css({
  display: 'block',

  '@media (max-width: 600px)': {
    display: 'none',
  },
});

const showMobile = css({
  display: 'none',
  '@media (max-width: 600px)': {
    display: 'block',
  },
});

const containerStyle = flex({
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingTop: 211,
  zIndex: 2,
  flexDirection: 'column',
  _mobile: {
    paddingTop: 180,
    paddingBottom: 200,
  },
});

const logoImageStyle = css({
  objectFit: 'contain',
  margin: '0 auto',
  maxWidth: '80vw',
  height: 'auto',
  _mobile: {
    maxWidth: '90vw',
  },
});

const descriptionStyle = css({
  marginTop: '24px',
  fontSize: '28px',
  lineHeight: '1.5',
  textAlign: 'center',
  color: '#fff',
  mb: '40px',
  whiteSpace: 'pre-line',
  fontWeight: 600,

  _mobile: {
    fontSize: '24px',
  },
});
