'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import SplitText from '@gitanimals/ui-panda/src/animation/SplitText/SplitText';
import { motion } from 'framer-motion';

export default function TopBanner() {
  const data = [
    {
      id: '671643895035339143',
      name: 'Frontend-Engineer',
      rank: 0,
      prize: 3000,
      rankType: 'WEEKLY_GUILD_CONTRIBUTIONS',
    },
    {
      id: '669546667782242005',
      name: 'Guild',
      rank: 1,
      prize: 2000,
      rankType: 'WEEKLY_GUILD_CONTRIBUTIONS',
    },
    {
      id: '673540103172091050',
      name: 'JIWOO-HOUSE',
      rank: 2,
      prize: 1000,
      rankType: 'WEEKLY_GUILD_CONTRIBUTIONS',
    },
  ];

  const [animateStep, setAnimateStep] = useState<'TEXT' | 'COIN' | 'PRIZE'>('TEXT');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = data[currentIndex];

  const onNextText = () => {
    const timer = setTimeout(() => {
      setAnimateStep('TEXT');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 1000);

    return () => clearTimeout(timer);
  };

  return (
    <div className={containerStyle}>
      <div className={textContainerStyle} key={currentIndex}>
        <SplitText
          style={textStyle}
          text={`Last Week ${currentIndex + 1}ST ${currentItem.name}`}
          delay={50}
          onLetterAnimationComplete={() => {
            setAnimateStep('COIN');
          }}
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
  );
}

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
