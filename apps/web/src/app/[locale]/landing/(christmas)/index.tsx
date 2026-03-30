import Image from 'next/image';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

import { MotionPet } from './MotionPet';
import { Snowflake } from './Snowflake';

export async function ChristmasContent() {
  const session = await getServerAuth();
  return (
    <div>
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

        <div
          className={css({
            position: 'relative',
            width: '100%',
            height: '100%',
            maxHeight: 'calc(100vh - 60px)',
            _mobile: {
              display: 'none',
            },
          })}
        >
          <div
            className={css({
              position: 'absolute',
              bottom: '0',
              right: '0',
              objectFit: 'contain',
              height: '100%',
              userSelect: 'none',
              cursor: 'pointer',
            })}
          >
            <MotionPet />
          </div>
        </div>
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
            Christmas is here in Gitaniamals!
            <br />
            Draw a Christmas pet now!
          </p>
          <div className={css({ display: 'flex', gap: '10px' })}>
            {!session ? (
              <LoginButton label="Pick a Christmas pet now" />
            ) : (
              <Link href="/mypage">
                <Button className="desktop" size="l">
                  Go To Mypage
                </Button>
                <Button className="mobile" size="m">
                  Go To Mypage
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="h-[60px]" />
    </div>
  );
}

const descriptionStyle = css({
  color: 'white.white_90',
  textStyle: 'glyph32.bold',
  fontWeight: 400,
  whiteSpace: 'pre-line',
  marginTop: '40px',
  marginBottom: '40px',
  _mobile: {
    textStyle: 'glyph16.regular',
    fontSize: '16px',
    marginTop: '20px',
    textAlign: 'center',
  },
});

const bgImageStyle = css({
  pointerEvents: 'none',
  objectPosition: 'bottom center',
});

const containerStyle = flex({
  position: 'relative',
  width: '80%',
  height: '100%',
  paddingLeft: '40px',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingBottom: '160px',
  _mobile: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '100px',
    pl: 0,
  },
});

const logoImageStyle = css({
  objectFit: 'contain',
  height: 'auto',
  _mobile: {
    maxWidth: '90vw',
  },
});

const bgContainerStyle = css({
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 60px )',
  display: 'grid',
  gridTemplateColumns: '3fr 4fr',
  paddingTop: '10%',

  _mobile: {
    gridTemplateColumns: '1fr',
  },
});
