import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';

import { HalloweenCardList } from './CardList';
import { KingGhost } from './KingGhost';
import { OnlyMobile } from '_panda/jsx';

export async function HalloweenContent() {
  const t = await getTranslations('Event.Halloween');
  return (
    <div className={bgContainerStyle}>
      <Image
        src="/event/halloween/halloween-bg.webp"
        alt="halloween bg"
        layout="fill"
        objectFit="cover"
        className={bgImageStyle}
      />
      <Image
        src="/event/halloween/halloween-right.webp"
        alt="halloween bg"
        width={544}
        height={1470}
        objectFit="contain"
        className={cx(imageStyle, rightImageStyle)}
      />
      <Image
        src="/event/halloween/halloween-left.webp"
        alt="halloween bg"
        width={561}
        height={1470}
        objectFit="contain"
        className={cx(imageStyle, leftImageStyle)}
      />

      <OnlyMobile>
        <KingGhost />
      </OnlyMobile>

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

        <HalloweenCardList />
        {/* <HalloweenDraw /> */}
      </div>
    </div>
  );
}

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

const bgImageStyle = css({
  pointerEvents: 'none',
});

const bgContainerStyle = css({
  position: 'relative',
  width: '100%',
  minHeight: 'calc(100vh - 60px)',
  fontFamily: 'Product Sans',
});

const imageStyle = css({
  width: 'auto',
  height: '100%',
  position: 'absolute',
  objectFit: 'contain',
  zIndex: 1,
  minHeight: 'calc(100vh - 60px)',
  pointerEvents: 'none',
  top: '-60px',
  _mobile: {
    display: 'none',
  },
});

const rightImageStyle = css({
  right: 0,
});

const leftImageStyle = css({
  position: 'absolute',
  left: 0,
});
