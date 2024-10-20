import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import { CardList, MobileCardList } from './CardList';

async function HalloweenEventPage() {
  const t = await getTranslations('Event.Halloween');

  return (
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

      <Button className={buttonStyle}>{t('draw-button')}</Button>
    </div>
  );
}

export default HalloweenEventPage;

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
  marginTop: 24,
  fontSize: 28,
  lineHeight: 1.5,
  textAlign: 'center',
  color: '#fff',
  mb: 40,
  whiteSpace: 'pre-line',
  fontWeight: 600,

  _mobile: {
    fontSize: 24,
  },
});

const buttonStyle = css({ width: '230px', height: '76px', margin: '63px auto 0', textStyle: 'glyph28.bold' });
