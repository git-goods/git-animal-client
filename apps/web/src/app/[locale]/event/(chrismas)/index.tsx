import Image from 'next/image';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';

import { ChristmasCardList } from './CardList';

export function ChristmasContent() {
  return (
    <div className={bgContainerStyle}>
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
        <ChristmasCardList />
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

const bgContainerStyle = css({
  position: 'relative',
  width: '100%',
  minHeight: 'calc(100vh - 60px)',
  fontFamily: 'Product Sans',
});
