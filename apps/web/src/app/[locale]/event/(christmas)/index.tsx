import Image from 'next/image';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';

import { ChristmasCardList } from './CardList';
import { ChristmasDraw } from './Draw';
import { Snowflake } from './Snowflake';

export function ChristmasContent() {
  return (
    <div className={bgContainerStyle}>
      {[...Array(20)].map((_, i) => (
        <Snowflake
          key={i}
          delay={i * 0.3}
          left={`${Math.random() * 100}%`}
          size={10 + Math.random() * 15}
          duration={8 + Math.random() * 3}
        />
      ))}

      <Image
        src="/event/christmas/christmas-bg.webp"
        alt="christmas bg"
        layout="fill"
        objectFit="cover"
        className={bgImageStyle}
      />

      <div className={containerStyle}>
        <Image
          src="/event/christmas/christmas-logo.svg"
          alt="gitanimals christmas event"
          width={1357}
          height={199}
          objectFit="contain"
          className={logoImageStyle}
          draggable={false}
        />
        <p className={descriptionStyle}>
          Christmas has come to Gitanimals
          <br />
          Draw Christmas pet for free!
        </p>
        <ChristmasCardList />
        <ChristmasDraw />
      </div>
    </div>
  );
}

const descriptionStyle = css({
  color: 'white.white_90',
  textStyle: 'glyph32.bold',
  fontWeight: 400,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  marginTop: '60px',
  marginBottom: '100px',
  _mobile: {
    textStyle: 'glyph16.regular',
    fontSize: '16px',
    marginTop: '20px',
    marginBottom: '40px',
  },
});

const bgImageStyle = css({
  pointerEvents: 'none',
});

const containerStyle = flex({
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingTop: '211px',
  zIndex: 2,
  flexDirection: 'column',
  paddingBottom: '280px',
  _mobile: {
    paddingTop: '110px',
    paddingBottom: '200px',
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
  overflow: 'hidden',
});
