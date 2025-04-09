import { css, cx } from '_panda/css';
import type { RankType } from '@gitanimals/api';
import { AnimatePresence, motion } from 'framer-motion';

import { RankingLink } from './RankingLink';

export function TopPodium({ ranks }: { ranks: RankType[] }) {
  const RANK = [
    {
      rank: 2,
      height: 148,
      crownElement: (
        <div className={subCrownStyle}>
          <img src="/rank/icon_crown_2.svg" alt="2nd place crown" width={36} height={36} />
        </div>
      ),
    },
    {
      rank: 1,
      height: 200,
      crownElement: (
        <div className={winnerCrownStyle}>
          <img src="/rank/icon_crown_1.svg" alt="1st place crown" width={60} height={60} />
        </div>
      ),
    },
    {
      rank: 3,
      height: 120,
      crownElement: (
        <div className={subCrownStyle}>
          <img src="/rank/icon_crown_3.svg" alt="3rd place crown" width={36} height={36} />
        </div>
      ),
    },
  ];

  if (ranks.length < 3) return null;

  return (
    <AnimatePresence>
      <div className={podiumStyle}>
        {RANK.map((item) => {
          const currentRank = ranks[item.rank - 1];
          return (
            <RankingLink id={currentRank.name} className={runnerUpStyle} key={`${item.rank}`}>
              <div className={profileStyle}>
                <img src={currentRank.image} alt={`${item.rank}등`} />
                {item.crownElement}
                <div className={brightBgStyle} />
              </div>
              <div className={nameStyle}>{currentRank.name}</div>
              <div className={contributionStyle}>{currentRank.contributions}</div>
              <motion.div
                key={`rostrum-${item.rank}`}
                initial={{ height: 0 }}
                animate={{ height: `${item.height}px`, flex: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: (item.rank || 1) * 0.3,
                }}
                className={cx(rostrumStyle)}
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    delay: (item.rank || 1) * 0.3 + 0.5, // rostrum 애니메이션 후 0.5초 뒤에 시작
                  }}
                >
                  {item.rank}
                </motion.p>
              </motion.div>
            </RankingLink>
          );
        })}
      </div>
    </AnimatePresence>
  );
}

const podiumStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '12px',
  flex: 1,

  _mobile: {
    minH: '300px',
  },
});

const rostrumStyle = css({
  width: '140px',
  borderRadius: '8px',
  background:
    'linear-gradient(180deg, #B9FFBD 0%, rgba(195, 255, 199, 0.85) 24.5%, rgba(203, 255, 206, 0.74) 43%, rgba(255, 255, 255, 0.00) 100%)',
  color: 'white.white_100',
  textAlign: 'center',
  fontFeatureSettings: 'liga off, clig off',
  textShadow: '0px 0px 40px rgba(0, 201, 50, 0.70)',
  fontSize: '60px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '140%',
  letterSpacing: '-5.961px',
  fontFamily: 'token(fonts.dnf)',
  pt: '16px',
  mt: '12px',
  position: 'relative',
  overflow: 'hidden',
  _mobile: {
    width: '80px',
    fontSize: '36px',
    pt: '12px',
    mt: '8px',
    pr: '4px',
  },
});

const runnerUpStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '20px',
  minHeight: '170px',
  _mobile: {
    minH: '80px',
  },
});

const brightBgStyle = css({
  width: '120px',
  height: '120px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: -1,
  opacity: 0.5,
  background:
    'radial-gradient(50% 50% at 50% 50%, #FFED86 0%, rgba(255, 237, 134, 0.17) 81%, rgba(255, 237, 134, 0.00) 100%)',
  _mobile: {
    width: '60px',
    height: '60px',
  },
});

const profileStyle = css({
  position: 'relative',
  width: '100px',
  height: '100px',
  '& > img': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  _mobile: {
    width: '40px',
    height: '40px',
  },
});

const subCrownStyle = css({
  position: 'absolute',
  top: '-29px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '36px',
  height: '36px',
  '& > img': {
    width: '100%',
    height: '100%',
  },
  _mobile: {
    width: '28px',
    height: '28px',
    top: '-28px',
  },
});

const winnerCrownStyle = css({
  position: 'absolute',
  top: '-46px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '60px',

  '& > img': {
    width: '100%',
    height: '100%',
  },
  _mobile: {
    width: '40px',
    height: '40px',
    top: '-40px',
  },
});

const nameStyle = css({
  textStyle: 'glyph18.bold',
  mt: '12px',
  color: 'white.white_90',
  maxWidth: '100%',
  overflow: 'visible',
  display: 'flex',
  justifyContent: 'center',
  whiteSpace: 'nowrap',

  _mobile: {
    fontSize: 'glyph15.bold',
    maxWidth: '80px',
    mt: '6px',
  },
});

const contributionStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
  _mobile: {
    fontSize: 'glyph12.regular',
  },
});
