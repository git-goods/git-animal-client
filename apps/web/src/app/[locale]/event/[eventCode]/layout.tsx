import React from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';

import GNB from '@/components/GNB/GNB';

import { Footer } from '../../landing/Footer';

import { KingGhost } from './KingGhost';

function HalloweenEventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <GNB />
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

        <div className={showMobile}>
          <KingGhost />
        </div>

        {children}
      </div>
      <Footer />
    </div>
  );
}

export default HalloweenEventLayout;

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
  top: -60,
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

const showMobile = css({
  display: 'none',
  _mobile: {
    display: 'block',
  },
});
