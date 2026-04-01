import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import { Button } from '@gitanimals/ui-panda';

import { getServerAuth } from '@/auth';
import { LoginButton } from '@/components/AuthButton';
import { Link } from '@/i18n/routing';

import { CherryBlossom } from './CherryBlossom';
import { MotionPetSection } from './MotionPet';

const BLOSSOM_COUNT = 28;

function getBlossomVariant(index: number): number {
  // 3번(작은 꽃잎) 비중 높게: 0→3개, 1→3개, 2→4개, 3→나머지(18개)
  if (index % 9 === 0) return 0;
  if (index % 7 === 0) return 1;
  if (index % 5 === 0) return 2;
  return 3;
}

export async function SpringContent() {
  const session = await getServerAuth();
  return (
    <div>
      <div className={bgContainerStyle}>
        {[...Array(BLOSSOM_COUNT)].map((_, i) => (
          <CherryBlossom
            key={i}
            delay={i * 0.25}
            left={`${Math.random() * 100}%`}
            size={8 + Math.random() * 20}
            duration={12 + Math.random() * 5}
            variant={getBlossomVariant(i)}
            opacity={0.6 + Math.random() * 0.3}
          />
        ))}

        <MotionPetSection />
        <div className={containerStyle}>
          <img src="/assets/spring-logo.svg" alt="GITANIMALS" className={springLogoStyle} />
          <p className={descriptionStyle}>
            Spring is blooming in Gitanimals!
            <br />
            Collect a spring pet now!
          </p>
          <div className={css({ display: 'flex', gap: '10px' })}>
            {!session ? (
              <LoginButton label="Get a spring pet now" />
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

const springLogoStyle = css({
  width: 'min(600px, 45vw)',
  height: 'auto',
  userSelect: 'none',
  filter: 'drop-shadow(0 4px 12px rgba(255, 150, 170, 0.3))',
  _mobile: {
    width: 'min(280px, 80vw)',
  },
});

const descriptionStyle = css({
  color: 'black.black_75',
  textStyle: 'glyph32.bold',
  fontWeight: 400,
  whiteSpace: 'pre-line',
  marginTop: '16px',
  marginBottom: '28px',
  lineHeight: 1.5,
  _mobile: {
    textStyle: 'glyph16.regular',
    fontSize: '16px',
    marginTop: '12px',
    marginBottom: '20px',
    textAlign: 'center',
  },
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
  paddingBottom: '0',
  gap: '0',
  _mobile: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0',
    pl: 0,
  },
});

const bgContainerStyle = css({
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 60px)',
  display: 'grid',
  gridTemplateColumns: '2fr 3fr',
  gap: '0',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #E8F4FD 0%, #FFF0F5 40%, #FFE4EE 70%, #FFDBEE 100%)',
  _mobile: {
    gridTemplateColumns: '1fr',
  },
});
