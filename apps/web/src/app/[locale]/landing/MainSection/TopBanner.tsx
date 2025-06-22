'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { rankQueries } from '@gitanimals/react-query';
import SplitText from '@gitanimals/ui-panda/src/animation/SplitText/SplitText';
import { wrap } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';

type AnimateStep = 'TEXT' | 'COIN';

const CHANGE_NEXT_BANNER_DELAY_TIME = 1000 as const;

export const TopBanner = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({ fallback: <></> })
  .on(() => {
    const quries = useSuspenseQueries({
      queries: [
        rankQueries.getRankHistoriesOptions({ rankType: 'WEEKLY_GUILD_CONTRIBUTIONS' }),
        rankQueries.getRankHistoriesOptions({ rankType: 'WEEKLY_USER_CONTRIBUTIONS' }),
      ],
    });

    const [animateStep, setAnimateStep] = useState<AnimateStep>('TEXT');
    const [currentIndex, setCurrentIndex] = useState(0);

    const guildHistories = quries[0].data.winner.map((winner) => ({ ...winner, rankType: 'Guild' }));
    const userHistories = quries[1].data.winner.map((winner) => ({ ...winner, rankType: 'User' }));
    const histories = [...guildHistories, ...userHistories];

    const currentItem = histories[currentIndex];
    const maxLength = histories.length;

    const onNextText = () => {
      const timer = setTimeout(() => {
        setAnimateStep('TEXT');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % maxLength);
      }, CHANGE_NEXT_BANNER_DELAY_TIME);

      return () => clearTimeout(timer);
    };

    return (
      <>
        <div className={containerStyle}>
          <div className={textContainerStyle} key={currentIndex}>
            <SplitText
              style={textStyle}
              text={`Last Week ${currentItem.rank + 1}ST ${currentItem.rankType} ${currentItem.name}`}
              delay={50}
              onLetterAnimationComplete={() => setAnimateStep('COIN')}
            />
            {animateStep === 'COIN' && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={coinContainerStyle}
              >
                <motion.img
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className={coinStyle}
                  width={32}
                  height={32}
                  src="/shop/coin.webp"
                  alt="coin"
                />
                <SplitText
                  key={currentIndex}
                  delay={50}
                  style={textStyle}
                  text={`${currentItem.prize}P!`}
                  onLetterAnimationComplete={() => {
                    onNextText();
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
        <div className={blankStyle} />
      </>
    );
  });

const blankStyle = css({
  width: '100%',
  height: '78px',
  _mobile: {
    height: '52px',
  },
});

const coinContainerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const containerStyle = css({
  background: 'white.white_25',
  color: 'white.white_100',
  padding: '10px 0',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  width: '100%',
});

const textContainerStyle = css({
  borderTop: '1px solid white',
  borderBottom: '1px solid white',
  display: 'flex',
  height: '58px',
  alignItems: 'center',
  justifyContent: 'center',

  textAlign: 'center',
  fontFeatureSettings: 'liga off, clig off',
  fontFamily: 'token(fonts.dosgothic)',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '120%',
  letterSpacing: '-0.3px',

  _mobile: {
    height: '35px',
    fontSize: '16px',
  },
});

const textStyle = {
  background: 'linear-gradient(116deg, #FFFA8E 31.98%, #62FFE3 98.75%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const coinStyle = css({
  width: '32px',
  height: '32px',
  ml: '10px',
  mr: '8px',

  _mobile: {
    width: '18px',
    height: '18px',
    ml: '0',
    mr: '1.5px',
  },
});
