'use client';

import { useState } from 'react';
import { cn, SplitText } from '@gitanimals/ui-tailwind';
import { rankQueries } from '@gitanimals/react-query';
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

const blankStyle = cn(
  'w-full h-[78px]',
  'max-mobile:h-[52px]'
);

const coinContainerStyle = cn(
  'flex items-center justify-center'
);

const containerStyle = cn(
  'bg-white/25 text-white py-2.5 absolute top-0 left-0 right-0 w-full'
);

const textContainerStyle = cn(
  'border-t border-b border-white',
  'flex h-[58px] items-center justify-center',
  'text-center font-dos text-[32px] font-medium leading-[120%] tracking-[-0.3px]',
  '[font-feature-settings:"liga"_off,"clig"_off]',
  'max-mobile:h-[35px] max-mobile:text-[16px]'
);

const textStyle = {
  background: 'linear-gradient(116deg, #FFFA8E 31.98%, #62FFE3 98.75%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const coinStyle = cn(
  'w-8 h-8 ml-2.5 mr-2',
  'max-mobile:w-[18px] max-mobile:h-[18px] max-mobile:ml-0 max-mobile:mr-[1.5px]'
);
